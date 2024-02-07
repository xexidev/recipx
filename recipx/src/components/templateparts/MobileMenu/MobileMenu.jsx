import './MobileMenu.css'
import MobileMenuButton from './MobileMenuButton/MobileMenuButton'
import paths from '../../../paths'
import { CookingPot, ScanBarcode, Carrot, DoorOpen } from 'lucide-react'
import { useContext } from 'react'
import { UserContext } from '../../../context/UserContext'

export default function MobileMenu () {
  const { isLoggedFromLocal } = useContext(UserContext)

  return (
    <>
      {
        isLoggedFromLocal &&
        <nav className='mobile-menu'>
          <ul>
            <MobileMenuButton
              icon={<CookingPot />}
              title='Receta'
              to={paths.getRecipe}
            />
            <MobileMenuButton
              icon={<ScanBarcode />}
              title='Escanear'
              to={paths.scan}
            />
            <MobileMenuButton
              icon={<Carrot />}
              title='Añadir'
              to={paths.addManually}
            />
            <MobileMenuButton
              icon={<DoorOpen />}
              title='Despensa'
              to={paths.pantry.replace(':page', '1')}
            />
          </ul>
        </nav>
      }
    </>
  )
}
