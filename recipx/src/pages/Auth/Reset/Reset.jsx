import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'
import Input from '../../../components/common/Input/Input'
import Button from '../../../components/common/Button/Button'
import paths from '../../../paths'
import useValidation from '../../../hooks/useValidation'
import Auth from '../Auth'
import AuthHeader from '../AuthHeader/AuthHeader'
import { LockKeyhole } from 'lucide-react'

export default function Reset () {
  const [userPassword, setUserPassword] = useState('')
  const [showValidationError, setShowValidationError] = useState(false)
  const { passwordError, validatePassword } = useValidation()
  const { resetPassword } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    validatePassword(userPassword)
  }, [userPassword])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (passwordError) {
      setShowValidationError(true)
      return
    }
    resetPassword({ password: userPassword })
    navigate(paths.home)
  }

  return (
  <Auth>
    <div className='reset'>
      <AuthHeader
        icon={ <LockKeyhole strokeWidth={3} />}
        title='Establecer contraseña'
        description='Introduce tu nueva contraseña'
      />
      <form id="form" onSubmit={handleSubmit}>
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
        <Button className='form-button'>Reestablecer</Button>
      </form>
    </div>
  </Auth>
  )
}
