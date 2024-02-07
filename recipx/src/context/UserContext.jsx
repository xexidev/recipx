import supabase from '../services/supabase'
import { useState, useEffect, createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { NotificationsContext } from './NotificationsContext'
import paths from '../paths'

export const UserContext = createContext()

export function UserProvider ({ children }) {
  const [isLoggedFromLocal, setIsLoggedFromLocal] = useState(false)
  const [userEmailFromLocal, setUserEmailFromLocal] = useState(null)
  const [userIdFromLocal, setUserIdFromLocal] = useState(null)
  const { setNotification } = useContext(NotificationsContext)
  const navigate = useNavigate()

  const JWT = JSON.parse(localStorage.getItem(import.meta.env.VITE_USER_TOKEN))

  const checkJWT = () => !!JWT
  const isLoggedFromToken = checkJWT()

  useEffect(() => {
    if (JWT) {
      setIsLoggedFromLocal(true)
    } else {
      setIsLoggedFromLocal(false)
    }
  }, [])

  useEffect(() => {
    if (JWT?.user?.id) {
      setUserIdFromLocal(JWT.user.id)
      setUserEmailFromLocal(JWT.user.email)
    } else {
      setUserIdFromLocal(null)
      setUserEmailFromLocal(null)
    }
  }, [isLoggedFromLocal])

  const getUserFromServer = async () => {
    try {
      const { data, error } = await supabase.auth.getUser()
      if (data.user) {
        return data.user
      } else if (error) {
        setNotification({ message: error.message, type: 'error' })
        return false
      } else {
        setNotification({ message: 'Usuario no autenticado', type: 'error' })
        return false
      }
    } catch (error) {
      setNotification({ message: error.message, type: 'error' })
    }
  }

  const userLogin = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) {
        setNotification({ message: error.message, type: 'error' })
      } else {
        setIsLoggedFromLocal(true)
        navigate(paths.home)
      }
    } catch (error) {
      setNotification({ message: error.message, type: 'error' })
    }
  }

  const userLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        setNotification({ message: error.message, type: 'error' })
      } else {
        setIsLoggedFromLocal(false)
        navigate(paths.home)
      }
    } catch (error) {
      setNotification({ message: error.message, type: 'error' })
    }
  }

  const userRegister = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })
      if (error) {
        setNotification({ message: error.message, type: 'error' })
      } else {
        setNotification({ message: `Email de confirmación enviado a ${email}` })
        navigate(paths.home)
      }
    } catch (error) {
      setNotification({ message: error.message, type: 'error' })
    }
  }

  const sendRecoverPasswordEmail = async ({ email }) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) {
        setNotification({ message: error.message, type: 'error' })
      } else {
        setNotification({ message: `Enlace para reestablecer la contraseña a ${email}` })
        navigate(paths.home)
      }
    } catch (error) {
      setNotification({ message: error.message, type: 'error' })
    }
  }

  const resetPassword = async ({ password }) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password
      })
      if (error) {
        setNotification({ message: error.message, type: 'error' })
      } else {
        setNotification({ message: 'Contraseña establecida, puedes iniciar sesión' })
        navigate(paths.userLogin)
      }
    } catch (error) {
      setNotification({ message: error.message, type: 'error' })
    }
  }

  const deleteUser = async () => {
    try {
      const { data, error } = await supabase.rpc('delete_user')
      if (error) {
        setNotification({ message: error.message, type: 'error' })
      } else {
        setNotification({ message: 'Usuario eliminado' })
        navigate(paths.home)
      }
    } catch (error) {
      setNotification({ message: error.message, type: 'error' })
    }
  }

  return (
    <UserContext.Provider value={
      {
        userLogin,
        userLogout,
        userRegister,
        sendRecoverPasswordEmail,
        resetPassword,
        deleteUser,
        getUserFromServer,
        userIdFromLocal,
        isLoggedFromLocal,
        userEmailFromLocal,
        isLoggedFromToken
      }}>
      {children}
    </UserContext.Provider>
  )
}
