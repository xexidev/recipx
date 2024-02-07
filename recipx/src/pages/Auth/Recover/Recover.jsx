import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'
import Input from '../../../components/common/Input/Input'
import Button from '../../../components/common/Button/Button'
import paths from '../../../paths'
import useValidation from '../../../hooks/useValidation'
import Auth from '../Auth'
import AuthHeader from '../AuthHeader/AuthHeader'
import { Send } from 'lucide-react'

export default function Recover () {
  const [userEmail, setUserEmail] = useState('')
  const [showValidationError, setShowValidationError] = useState()
  const { emailError, validateEmail } = useValidation()
  const { sendRecoverPasswordEmail } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    validateEmail(userEmail)
  }, [userEmail])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (emailError) {
      setShowValidationError(true)
      return
    }
    sendRecoverPasswordEmail({ email: userEmail })
    navigate(paths.home)
  }

  return (
  <Auth>
    <div className='recover'>
      <AuthHeader
        icon={ <Send strokeWidth={3} />}
        title='Recuperar contraseña'
        description='Si has olvidado tu contraseña, introduce tu correo y te enviaremos un enlace para reestablecerla.'
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
        <Button className='form-button'>Enviar correo de recuperación</Button>
      </form>
    </div>
  </Auth>
  )
}
