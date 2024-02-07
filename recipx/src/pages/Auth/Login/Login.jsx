import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../../context/UserContext'
import Input from '../../../components/common/Input/Input'
import Button from '../../../components/common/Button/Button'
import useValidation from '../../../hooks/useValidation'
import Auth from '../Auth'
import AuthHeader from '../AuthHeader/AuthHeader'
import AuthRecoverPwdLink from '../AuthRecoverPwdLink/AuthRecoverPwdLink'
import { KeyRound } from 'lucide-react'

export default function Login () {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [showValidationError, setShowValidationError] = useState(false)
  const { emailError, passwordError, validateEmail, validatePassword } = useValidation()
  const { userLogin } = useContext(UserContext)

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
    userLogin({ email: userEmail, password: userPassword })
  }

  return (
    <Auth>
      <div className='login'>

        <AuthHeader
          icon={<KeyRound strokeWidth={3} />}
          title='Iniciar sesión'
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
              autoComplete='current-password'
              showValidationError={showValidationError}
              showValidationErrorMessage={true}
              validationErrorMessage={passwordError}
              togglePasswordVisibility={true}
              required
            />
          <Button className='form-button'>Iniciar sesión</Button>
        </form>
        <AuthRecoverPwdLink />
      </div>
    </Auth>
  )
}
