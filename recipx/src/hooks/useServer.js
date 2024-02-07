import supabase from '../services/supabase'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { NotificationsContext } from '../context/NotificationsContext'

export default function useServer () {
  const { getUserFromServer, isLoggedFromToken } = useContext(UserContext)
  const { setNotification } = useContext(NotificationsContext)

  const getAllUserProducts = async () => {
    if (isLoggedFromToken) {
      const user = await getUserFromServer()
      if (user) {
        try {
          const { data, error } = await supabase
            .from(import.meta.env.VITE_USER_TABLE)
            .select('*')
            .eq('user_id', user.id)
          if (error) {
            setNotification({ message: error.message, type: 'error' })
          } else {
            return data
          }
        } catch (error) {
          setNotification({ message: error.message, type: 'error' })
        }
      } else {
        setNotification({ message: 'Usuario no encontrado', type: 'error' })
      }
    }
  }

  const getProductName = async (productId) => {
    try {
      const { data, error } = await supabase
        .from(import.meta.env.VITE_USER_TABLE)
        .select('*')
        .eq('id', productId)
        .single()
      if (error) {
        setNotification({ message: error.message, type: 'error' })
        return
      }
      return data.product_name
    } catch (error) {
      setNotification({ message: error.message, type: 'error' })
    }
  }

  const productNameExists = async (productName) => {
    const user = await getUserFromServer()
    if (user) {
      try {
        const { data, error } = await supabase
          .from(import.meta.env.VITE_USER_TABLE)
          .select('*')
          .eq('product_name', productName)
          .eq('user_id', user.id)
        if (error) {
          setNotification({ message: error.message, type: 'error' })
        }
        if (data.length === 0) {
          return false
        } else {
          return true
        }
      } catch (error) {
        setNotification({ message: error.message, type: 'error' })
      }
    }
  }

  const addProduct = async (product) => {
    const { productName, productBrand, productCode, productImg } = product
    if (isLoggedFromToken) {
      const productExists = await productNameExists(productName)
      if (productExists) {
        setNotification({ message: 'El producto ya existe', type: 'error' })
      } else {
        const user = await getUserFromServer()
        if (user) {
          try {
            const { data, error } = await supabase
              .from(import.meta.env.VITE_USER_TABLE)
              .insert([
                {
                  user_id: user.id,
                  product_name: productName,
                  product_brand: productBrand,
                  product_code: productCode,
                  product_img: productImg
                }
              ])
              .select()
            if (error) {
              setNotification({ message: error.message, type: 'error' })
            } else if (data) {
              setNotification({ message: `${productName} ha sido añadido` })
            }
          } catch (error) {
            console.log(error)
          }
        } else {
          setNotification({ message: 'Usuario no encontrado', type: 'error' })
        }
      }
    }
  }

  const removeProduct = async (productId) => {
    const user = await getUserFromServer()
    if (user) {
      const productNameToDelete = await getProductName(productId)
      try {
        const { error } = await supabase
          .from(import.meta.env.VITE_USER_TABLE)
          .delete()
          .eq('id', productId)
        if (error) {
          setNotification({ message: error.message, type: 'error' })
          return
        }
        setNotification({ message: `${productNameToDelete} ha sido eliminado` })
      } catch (error) {
        if (error) {
          setNotification({ message: error.message, type: 'error' })
        }
      }
    } else {
      setNotification({ message: 'Usuario no encontrado', type: 'error' })
    }
  }

  return {
    productNameExists,
    getAllUserProducts,
    addProduct,
    removeProduct
  }
}
