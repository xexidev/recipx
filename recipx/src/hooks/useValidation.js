import { useState } from 'react'

export default function useValidation () {
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [productValidationError, setProductValidationError] = useState(null)
  const [brandValidationError, setBrandValidationError] = useState(null)

  const validateEmail = (email) => {
    if (email.length <= 0) {
      setEmailError('Es necesario un correo electrónico')
      return
    }
    const regexEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!regexEmailFormat.test(email)) {
      setEmailError('Usa un correo electrónico válido')
      return
    }
    setEmailError(null)
  }

  const validatePassword = (password) => {
    if (password.length < 8 || password.length > 32) {
      setPasswordError('La contraseña ha de tener entre 8 y 32 caracteres')
      return
    }
    if (/\s/g.test(password)) {
      setPasswordError('La contraseña no puede tener espacios en blanco')
      return
    }
    const regexAsciiValues = /^[!\"#\$%&'()*+,\-.\/0-9:;<=>?@A-Z\[\]^_`a-z\{\|\}~]*$/
    if (!regexAsciiValues.test(password)) {
      const found = new Set()
      Array.from(password).forEach(char => {
        if (!char.match(regexAsciiValues)) {
          found.add(' ' + char)
        }
      })
      const foundArr = Array.from(found)
      setPasswordError(`${foundArr.length > 1 ? 'Los caracteres' : 'El caracter'} ${foundArr.toString()} ${foundArr.length > 1 ? 'no están permitidos' : 'no está permitido'}`)
      return
    }
    const regexUpperLowerNumber = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+/
    if (!regexUpperLowerNumber.test(password)) {
      setPasswordError('La contraseña ha de tener al menos un número una mayúscula y una minúscula')
      return
    }
    setPasswordError(null)
  }

  const validateProduct = (text) => {
    if (text.length < 3 || text.length > 65) {
      setProductValidationError('El producto o ingrediente ha de tener entre 3 y 64 cacracteres')
      return
    }
    const regex = /^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚäëïöüÄËÏÖÜâêîôÂÊÎÔàèìòÀÈÌÒçÇ·'¨´\- ]*$/
    if (!regex.test(text)) {
      setProductValidationError('El producto contiene caracteres inválidos')
      return
    }
    setProductValidationError(null)
  }

  const validateBrand = (text) => {
    const regex = /^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚäëïöüÄËÏÖÜâêîôÂÊÎÔàèìòÀÈÌÒçÇ·'¨´\- ]*$/
    if (!regex.test(text)) {
      setBrandValidationError('La marca contiene caracteres inválidos')
      return
    }
    setBrandValidationError(null)
  }

  return {
    emailError,
    passwordError,
    productValidationError,
    brandValidationError,
    validateEmail,
    validatePassword,
    validateProduct,
    validateBrand
  }
}
