import { useState, useContext } from 'react'
import { UserContext } from '../../../context/UserContext'
import Auth from '../Auth'
import AuthHeader from '../AuthHeader/AuthHeader'
import { UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/common/Button/Button'
import paths from '../../../paths'

export default function UserAccount () {
  const { userLogout, deleteUser } = useContext(UserContext)
  const [isSure, setIsSure] = useState(false)
  const navigate = useNavigate()

  const handleDeleteUser = async (e) => {
    e.preventDefault()
    await deleteUser()
    await userLogout()
    navigate(paths.home)
  }

  return (
    <Auth>
      <div className='user-account'>
        <AuthHeader
          icon={<UserRound strokeWidth={3} />}
          title='Mi cuenta'
          description='Desde aquí puedes eliminar tu cuenta, no podrás volver a acceder a tu despensa.'
        />
        {
          isSure
            ? <Button className='button-red' onClick={e => handleDeleteUser(e)}>¿Estás seguro?<br/>No se puede deshacer</Button>
            : <Button className='button-orange' onClick={e => setIsSure(true)}>Quiero eliminar mi cuenta</Button>
        }
      </div>
    </Auth>
  )
}
