import { Link } from 'react-router-dom'
import './LinkButton.css'

export default function LinkButton ({ to, className, children }) {
  return (
    <Link to={to} className={className ? `linkButton ${className}` : 'linkButton'}>{children}</Link>
  )
}
