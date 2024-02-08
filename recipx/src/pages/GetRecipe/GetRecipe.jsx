import './GetRecipe.css'
import { useEffect, useState, useRef, useContext } from 'react'
import { Frown } from 'lucide-react'
import ContentHeader from '../../components/templateparts/ContentHeader/ContentHeader'
import FormCard from '../../components/common/FormCard/FormCard'
import Select from '../../components/common/Select/Select'
import Button from '../../components/common/Button/Button'
import useServer from '../../hooks/useServer'
import Loading from '../../components/helpers/Loading/Loading'
import RecipeCard from './RecipeCard/RecipeCard'
import { NotificationsContext } from '../../context/NotificationsContext'
import ContentNotification from '../../components/templateparts/ContentNotification/ContentNotification'
import paths from '../../paths'

export default function GetRecipe () {
  const [creditsRemaining, setCreditsRemaining] = useState()
  const [isChekingCredits, setIsCheckingCredits] = useState(true)
  const [isChekingPantry, setIsCheckingPantry] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [pantry, setPantry] = useState()
  const [showRecipe, setShowRecipe] = useState(false)
  const [recipe, setRecipe] = useState(null)
  const { getAllUserProducts } = useServer()
  const [recipeType, setRecipeType] = useState({ ocasion: 'un Desayuno', course: 'un Entrante', main: 'Carne', style: 'clásico' })
  const recipeRef = useRef()
  const { setNotification } = useContext(NotificationsContext)

  const getPantry = async () => {
    const newPantry = await getAllUserProducts()
    setPantry(newPantry)
    setIsCheckingPantry(false)
  }

  useEffect(() => {
    getPantry()
  }, [])

  const pantryNames = async () => {
    const pantry = await getAllUserProducts()
    return pantry.map(product => product.product_name).join(', ')
  }

  const getRecipe = async () => {
    setShowRecipe(true)
    setIsLoading(true)
    const newRecipe = await getRecipeFromApi()
    setRecipe(newRecipe)
    setIsLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setRecipe(null)
    const pantryProducts = await pantryNames()
    getRecipe(recipeType, pantryProducts)
  }

  useEffect(() => {
    if (recipe || showRecipe) {
      recipeRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [recipe, showRecipe])

  const resetRecipe = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setRecipe(null)
    setShowRecipe(false)
  }

  const getRecipeFromApi = async () => {
    const JWT = JSON.parse(localStorage.getItem(import.meta.env.VITE_USER_TOKEN))
    const pantry = await pantryNames()

    try {
      const response = await fetch('https://recipx.xexi.es:3001/recipe',
        {
          headers: {
            token: JWT.access_token,
            ocasion: recipeType.ocasion,
            main: recipeType.main,
            course: recipeType.course,
            style: recipeType.style,
            pantry
          },
          mode: 'cors'
        })
      const data = await response.json()
      if (data.type === 'success') {
        return data.message
      } else if (data.type === 'error' && data.errorCause === 'auth') {
        setNotification({ message: data.message, type: 'error' })
        return data.message
      } else if (data.type === 'error' && data.errorCause === 'credits') {
        setNotification({ message: data.message, type: 'error' })
        return data.message
      }
    } catch (error) {
      return error
    }
  }

  const getCreditsFromApi = async () => {
    const JWT = JSON.parse(localStorage.getItem(import.meta.env.VITE_USER_TOKEN))
    try {
      const response = await fetch('https://recipx.xexi.es:3001/credits',
        {
          headers: {
            token: JWT.access_token
          },
          mode: 'cors'
        })
      const data = await response.json()
      if (data) {
        return data.message
      } else if (data.type === 'error' && data.errorCause === 'auth') {
        setNotification({ message: data.message, type: 'error' })
        return data.message
      }
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    const getCredits = async () => {
      const credits = await getCreditsFromApi()
      setCreditsRemaining(credits)
      setIsCheckingCredits(false)
    }
    getCredits()
  }, [recipe])

  return (
    <section className='container get-recipe'>
      <div className='content'>
        <ContentHeader
          title='Nueva receta'
          text={ creditsRemaining > 0 && `Te quedan ${creditsRemaining} créditos` }
        />
        { isChekingCredits
          ? <Loading title='Comprbando tus créditos' text='ya casi estamos...' />
          : creditsRemaining
            ? <div className='get-recipe-form-container'>
            {
              isChekingPantry
                ? <Loading title='Revisando tu despensa' text='un segundito...' />
                : pantry?.length === 0
                  ? <ContentNotification
                      icon={<Frown />}
                      title='Despensa vacía'
                      text='Parece que no hay ningún producto ni ingrediente en tu despensa'
                      buttonText='Añadir productos'
                      to={paths.add}
                      buttonClassName='button-blue'
                    />
                  : <FormCard onSubmit={e => handleSubmit(e)}>
                      <Select
                        id='ocasion'
                        name='ocasion'
                        onChange={e => setRecipeType({ ...recipeType, ocasion: e.target.value })}
                        hasLabel={true}
                        label='Ocasión'
                        options={[
                          { value: 'un Desayuno', label: 'Desayuno' },
                          { value: 'un Almuerzo', label: 'Almuerzo' },
                          { value: 'una Comida', label: 'Comida' },
                          { value: 'una Merienda', label: 'Merienda' },
                          { value: 'una Cena', label: 'Cena' },
                          { value: 'un Aperitivo', label: 'Aperitivo' },
                          { value: 'un Brunch', label: 'Brunch' },
                          { value: 'un Picnic', label: 'Picnic' }
                        ]}
                      />
                      <Select
                        id='course'
                        name='course'
                        onChange={e => setRecipeType({ ...recipeType, course: e.target.value })}
                        hasLabel={true}
                        label='Plato'
                        options={[
                          { value: 'un Entrante', label: 'Entrante' },
                          { value: 'un Plato Principal', label: 'Principal' },
                          { value: 'un Segundo Plato', label: 'Segundo' },
                          { value: 'un Postre', label: 'Postre' },
                          { value: 'una ensalada', label: 'Ensalada' },
                          { value: 'una sopa', label: 'Sopa' },
                          { value: 'un Cocktail', label: 'Cocktail' }
                        ]}
                      />
                      <Select
                        id='main'
                        name='main'
                        onChange={e => setRecipeType({ ...recipeType, main: e.target.value })}
                        hasLabel={true}
                        label='Tipo'
                        options={[
                          { value: 'Carne', label: 'Carne' },
                          { value: 'Pescado', label: 'Pescado' },
                          { value: 'Onmívoro', label: 'Onmívoro' },
                          { value: 'Vegetariano', label: 'Vegetariano' },
                          { value: 'Vegano', label: 'Vegano' }
                        ]}
                      />
                      <Select
                        id='style'
                        name='style'
                        onChange={e => setRecipeType({ ...recipeType, style: e.target.value })}
                        hasLabel={true}
                        label='Estilo'
                        options={[
                          { value: 'clásica', label: 'Clásico' },
                          { value: 'tradicional', label: 'Tradicional' },
                          { value: 'asiática', label: 'Asiático' },
                          { value: 'exótica', label: 'Exótico' },
                          { value: 'mejicana', label: 'Mejicano' },
                          { value: 'árabe', label: 'Árabe' }
                        ]}
                      />
                      <Button className='form-button'>¡A cocinar!</Button>
                    </FormCard>
                }
              </div>
            : <ContentNotification
              className='get-recipe-no-credits'
              icon={<Frown />}
              title='No te quedan créditos'
              text='Has agotado todos los créditos para generar recetas esta semana. Cada lunes tu cuenta volverá a tener 15 créditos.'
            />
          }
      </div>
      {
        showRecipe &&
        <div className='recipe content' ref={recipeRef}>
          <RecipeCard recipeIsReady={!!recipe}>
          {
          isLoading
            ? <Loading title='Creando receta' text='Haciéndose la boca agua...' />
            : recipe && recipe
          }
          </RecipeCard>
          {
            (recipe && creditsRemaining > 0) && <Button className='button-orange' onClick={e => resetRecipe()}>Generar otra receta</Button>
          }
        </div>
      }
    </section>
  )
}
