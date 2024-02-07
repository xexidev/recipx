import './ContentHeader.css'

export default function ContentHeader ({ className, icon, title, text }) {
  return (
    <div className={ className ? `${className} content-header` : 'content-header'}>
      {icon}
      <h1 className='text-red'>{title}</h1>
      <div className='content-header-text'>{text}</div>
    </div>
  )
}
