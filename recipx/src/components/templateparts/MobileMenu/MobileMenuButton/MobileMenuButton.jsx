import './MobileMenuButton.css'
import { Link } from 'react-router-dom'

export default function MobileMenuButton ({ icon, title, to }) {
  return (
    <li className='mobile-menu-button'>
      <Link className='mobile-menu-button-link' to={to}>
        <div className='mobile-menu-button-link-icon'>{icon}</div>
        <div className='mobile-menu-button-link-title'>{title}</div>
      </Link>
    </li>
  )
}
