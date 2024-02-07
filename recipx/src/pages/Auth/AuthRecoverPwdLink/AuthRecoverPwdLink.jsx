import { Link } from 'react-router-dom'
import paths from '../../../paths'
import './AuthRecoverPwdLink.css'

export default function AuthRecoverPwdLink () {
  return (
    <Link className='forgot-password' to={paths.userRecoverPassword}>¿Olvidaste tu contraseña?</Link>
  )
}
