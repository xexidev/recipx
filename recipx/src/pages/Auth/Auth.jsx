import './Auth.css'

export default function Auth ({ children }) {
  return (
    <section className="auth container">
      <div className='content'>
        { children }
      </div>
    </section>
  )
}
