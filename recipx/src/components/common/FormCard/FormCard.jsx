import './FormCard.css'

export default function FormCard ({ children, id, className, onSubmit }) {
  return (
    <form id={id} className={className ? `${className} formCard` : 'formCard'} onSubmit={onSubmit}>
      {children}
    </form>
  )
}
