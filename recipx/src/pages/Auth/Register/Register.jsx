import { useState, useContext, useEffect } from 'react'
import Auth from '../Auth'
import { UserContext } from '../../../context/UserContext'
import useValidation from '../../../hooks/useValidation'
import Input from '../../../components/common/Input/Input'
import Button from '../../../components/common/Button/Button'
import { UserRoundPlus } from 'lucide-react'
import AuthHeader from '../AuthHeader/AuthHeader'
import AuthRecoverPwdLink from '../AuthRecoverPwdLink/AuthRecoverPwdLink'

export default function Register () {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [showValidationError, setShowValidationError] = useState(false)
  const { validateEmail, validatePassword, emailError, passwordError } = useValidation()
  const { userRegister } = useContext(UserContext)

  useEffect(() => {
    validateEmail(userEmail)
  }, [userEmail])

  useEffect(() => {
    validatePassword(userPassword)
  }, [userPassword])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (emailError || passwordError) {
      setShowValidationError(true)
      return
    }
    userRegister({ email: userEmail, password: userPassword })
  }

  return (
    <Auth>
      <div className='register'>
        <AuthHeader
          icon={<UserRoundPlus strokeWidth={3} />}
          title='Regístrate'
          description='Únete a Recipx para obtener tu despensa personal y comenzar a crear deliciosas recetas.'
        />
        <form id="form" onSubmit={handleSubmit}>
          <Input
            type='email'
            inputId='userEmail'
            name='userEmail'
            onChange={e => setUserEmail(e.target.value)}
            value={userEmail}
            label='Correo electrónico'
            autofocus={true}
            autoComplete='email'
            showValidationError={showValidationError}
            showValidationErrorMessage={true}
            validationErrorMessage={emailError}
            required
          />
          <Input
            type='password'
            inputId='userPassword'
            name='userPassword'
            onChange={e => setUserPassword(e.target.value)}
            value={userPassword}
            label='Contraseña'
            autoComplete='new-password'
            showValidationError={showValidationError}
            showValidationErrorMessage={true}
            validationErrorMessage={passwordError}
            togglePasswordVisibility={true}
            showInfoBullet={true}
            infoMessage='La contraseña debe tener entre 8 y 32 caracteres y ha de contener al menos una minúscula, una mayúscula y un número.'
            required
          />
          <Button className='form-button'>Registrarse</Button>
        </form>
        <AuthRecoverPwdLink />
      </div>
    </Auth>
  )
}
