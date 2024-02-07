import './Button.css'

export default function Button ({ id, className, onClick, value, children, dataId }) {
  return (
    <button
    id={id}
    className={className ? `button-component ${className}` : 'button-component'}
    onClick={onClick}
    value={value}
    >{children}</button>
  )
}
