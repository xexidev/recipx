import { Link } from 'react-router-dom'
import './Header.css'
import paths from '../../../paths'
import { Menu } from 'lucide-react'
import logo from '../../../img/logo.svg'
import SideNavMenu from './SideNavMenu/SideNavMenu'
import { useState, useRef } from 'react'

export default function Header () {
  const [menuIsVisible, setMenuIsVisible] = useState(false)
  const buttonRef = useRef(null)

  const toggleMenu = () => {
    setMenuIsVisible(!menuIsVisible)
  }

  return (
    <header className='header container'>
      <div className='content'>
        <div className='header-logo'>
          <Link className='header-logo-link' to={paths.home}>
            <img src={logo} className='header-logo-link-ico'/>Recipx
          </Link>
        </div>
        <div ref={buttonRef} className='header-menu'>
          <Menu onClick={e => toggleMenu()} />
          <SideNavMenu menuIsVisible={menuIsVisible} setMenuIsVisible={setMenuIsVisible}/>
        </div>
      </div>
    </header>
  )
}
