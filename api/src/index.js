// Server Setup
require('dotenv').config({ path: __dirname + '/../.env' });
const https = require('https')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const cron = require('cron');

// Supabase Setup
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE)

// OpenAI setup
const { OpenAI } = require('openai')
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY })

// SUPABASE FUNCTIONS
// Check for user in Auth
const getUserFromSupabase = async (token) => {
  try {
    const { data, error } = await supabase.auth.getUser(token)
    if (data) {
      return data
    }
    if (error) {
      return error
    }
  } catch (error) {
    return error
  }
}

// Check for user in Usage
const userExistsInUsage = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('Usage')
      .select('*')
      .eq('user_id', userId)
      .single()
    if (data) {
      return true
    }
    if (error) {
      return false
    }
  } catch (error) {
    return error
  }
}

// Add user to Usage table
const addUserToUsage = async (userId, userEmail) => {
  const timestamptz = new Date().toISOString()
  try {
    const { data, error } = await supabase
      .from('Usage')
      .insert([
        {
          user_id: userId,
          user_email: userEmail,
          premium: false,
          credits: 15,
          last_recharge: timestamptz
        }
      ])
      .select()
    if (data) {
      return data
    }
    if (error) {
      return error
    }
  } catch (error) {
    return error
  }
}

// Check usage
const getUserCredits = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('Usage')
      .select('*')
      .eq('user_id', userId)
      .single()
    if (data) {
      return data.credits
    }
    if (error) {
      return error
    }
  } catch (error) {
    return error
  }
}

// Substract one credit
const setNewCredits = async (userId, newCredits) => {
  try {
    const { data, error } = await supabase
      .from('Usage')
      .update({ credits: newCredits })
      .eq('user_id', userId)
      .select()
    if (data) {
      return data.credits
    }
    if (error) {
      return error
    }
  } catch (error) {
    return error
  }
}

// CRON Recharge credits every week
const rechargeCredits = new cron.CronJob('0 0 * * MON', async () => {
  const timestamptz = new Date().toISOString()
  console.log(`Ejecutando en ${timestamptz}`)
  try {
    const { data, error } = await supabase
      .from('Usage')
      .select('*')
    if (data) {
      data.forEach(async user => {
        if (user.credits < 15) {
          try {
            const { data, error } = await supabase
              .from('Usage')
              .update({ credits: 15, last_recharge: timestamptz })
              .eq('user_id', user.user_id)
              .select()
            if (data) {
              console.log(`Créditos para ${user.user_id} actualizados`)
            }
            if (error) {
              console.log(`Fallo al asignar créditos para ${user.user_id}. ${error}`)
            }
          } catch (error) {
            console.log(`Fallo al asignar créditos para ${user.user_id}. ${error}`)
          }
        }
      })
    }
    if (error) {
      console.log(`Fallo al obtener usuarios. ${error}`)
    }
  } catch (error) {
    console.log(`Fallo al obtener usuarios. ${error}`)
  }
})
rechargeCredits.start()

// Start Server
const PORT = 3001
const app = express()
app.use(cors());

https
  .createServer(
    {   
      key: fs.readFileSync('/home/recipx/ssl.key'),
      cert: fs.readFileSync('/home/recipx/ssl.cert'),
    },
    app)
  .listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`)
  });

// Routes
app.get("/credits", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*")
  const token = req.headers.token
  const userIsLogged = await getUserFromSupabase(token)
  if (userIsLogged?.user?.aud === 'authenticated') {
    const userId = userIsLogged.user.id
    const userEmail = userIsLogged.user.email
    const userExists = await userExistsInUsage(userId)
    if (!userExists) {
      await addUserToUsage(userId, userEmail)
    }
    const userCredits = await getUserCredits(userId)
    res.json({ message: userCredits })
  } else {
    res.json({ type: 'error', errorCause: 'auth', message: 'Usuario no autenticado.' })
  }
})

app.get("/recipe", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*")

  const token = req.headers.token
  const pantry = req.headers.pantry
  const style = req.headers.style
  const course = req.headers.course
  const main = req.headers.main
  const ocasion = req.headers.ocasion
  const query = `Dame una receta ${style} para ${course} de ${main} para ${ocasion} que se pueda hacer combinando algunos de estos ingredientes, pero MUY IMPORTANTE, sin usar ninguno que no esté en esta lista: ${pantry}. Comienza la receta con el nombre de la receta en mayúsculas.`

  
  try {
    const userIsLogged = await getUserFromSupabase(token)
    if (userIsLogged?.user?.aud === 'authenticated') {
      const userId = userIsLogged.user.id
      const userCredits = await getUserCredits(userId)
      if (userCredits > 0) {
        const newCredits = userCredits - 1
        setNewCredits(userId, newCredits)

        // OpenAI Query
        const completion = await openai.chat.completions.create({
          messages: [{ role: 'user', content: query }],
          model: 'gpt-3.5-turbo-1106'
        })
        const response = completion.choices[0].message.content

        res.json({ type: 'success', message: response })
      } else {
        res.json({ type: 'error', errorCause: 'credits', message: 'No tienes suficientes créditos.' })
      }
    } else {
      res.json({ type: 'error', errorCause: 'auth', message: 'Usuario no autenticado.' })
    }
  } catch (error) {
    res.json(error.message)
  }
})