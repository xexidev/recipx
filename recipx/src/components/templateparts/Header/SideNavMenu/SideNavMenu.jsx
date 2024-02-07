import { useContext } from 'react'
import { UserContext } from '../../../../context/UserContext'
import { Link } from 'react-router-dom'
import paths from '../../../../paths'
import './SideNavMenu.css'
import { ChefHat, ScanBarcode, Keyboard, DoorOpen, CircleUserRound, KeyRound, UserPlus, X, LogOut } from 'lucide-react'

export default function SideNavMenu ({ menuIsVisible, setMenuIsVisible }) {
  const { isLoggedFromLocal, userEmailFromLocal, userLogout } = useContext(UserContext)

  return (
    <>
      <nav className={ menuIsVisible ? 'side-nav-menu visible' : 'side-nav-menu' }>
        <div className='side-nav-menu-close'><X className='side-nav-menu-close-button' onClick={e => setMenuIsVisible(false)} /></div>
        { isLoggedFromLocal
          ? <>
            <div className='side-nav-menu-welcome'>Hola, {userEmailFromLocal}</div>
            <ul onClick={e => setMenuIsVisible(false)}>
                <li><Link to={paths.getRecipe} title='Nueva receta'><ChefHat />Nueva receta</Link></li>
                <li><Link to={paths.scan} title='Escanear producto'><ScanBarcode />Escanear producto</Link></li>
                <li><Link to={paths.addManually} title='Añadir ingrediente'><Keyboard />Añadir ingrediente</Link></li>
                <li><Link to={paths.pantry.replace(':page', '1')} title='Mi despensa'><DoorOpen />Mi despensa</Link></li>
                <li><Link to={paths.user} title='Mi cuenta'><CircleUserRound />Mi cuenta</Link></li>
                <li className='side-nav-menu-logout' onClick={userLogout}><LogOut />Salir</li>
              </ul>
            </>
          : <ul onClick={e => setMenuIsVisible(false)}>
              <li><Link to={paths.userLogin} title='Ingresar'><KeyRound />Iniciar sesión</Link></li>
              <li><Link to={paths.userRegister} title='Registrarse'><UserPlus />Registrarse</Link></li>
            </ul>
        }
      </nav>
      <div onClick={e => setMenuIsVisible(false)} className={menuIsVisible ? 'side-nav-menu-backdrop visible' : 'side-nav-menu-backdrop' }></div>
    </>
  )
}
