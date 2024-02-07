import './CardLink.css'
import { Link } from 'react-router-dom'

export default function CardLink ({ icon, image, title, description, to, className }) {
  return (
    <Link to={to} className={ className ? `${className} card-link` : 'card-link'} style={{ backgroundImage: `url(${image} )` }}>
      <h2 className='card-link-title'>{icon}{title}</h2>
      <div className='card-link-description'>{description}</div>
      <div className='card-link-gradient'></div>
    </Link>
  )
}
