import './Footer.css'
import { Link } from 'react-router-dom'
import paths from '../../../paths'

export default function Footer () {
  return (
    <footer className="footer">
      <a href='https://github.com/xexidev/recipx' rel='noreferrer' target='_blank'>View on GitHub</a>
      <a href='https://xexi.es' rel='noreferrer' target='_blank'>xexi.es</a>
      <a href='mailto:hola@xexi.es' rel='noreferrer' target='_blank'>hola@xexi.es</a>
      <Link to={paths.imageCredits}>Image credits</Link>
    </footer>
  )
}
