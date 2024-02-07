import './AuthHeader.css'

export default function AuthHeader ({ icon, title, description }) {
  return (
    <div className={description ? 'auth-header has-description' : 'auth-header'}>
      <h1>{ icon }{ title }</h1>
      <div className='auth-header-description'>{ description }</div>
    </div>
  )
}
