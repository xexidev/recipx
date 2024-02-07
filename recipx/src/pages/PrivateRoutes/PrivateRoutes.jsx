import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoutes ({ redirectRoute }) {
  const { isLoggedFromToken } = useContext(UserContext)

  return (
    <>
      {
        isLoggedFromToken
          ? <Outlet />
          : <Navigate to={redirectRoute} />
      }
    </>
  )
}
