import './ContentNotification.css'
import LinkButton from '../../common/LinkButton/LinkButton'
import Button from '../../common/Button/Button'

export default function ContentNotification ({ className, title, text, icon, buttonText, to, buttonClassName, onClick }) {
  return (
    <>
      <div className="content-notification">
          <div className={ className ? `${className} content-notification-card` : 'content-notification-card' }>
            { icon }
            { title && <h2 className="content-notification-card-title">{title}</h2> }
            { text && <div className="content-notification-card-text">{text}</div> }
            { buttonText && to && <LinkButton to={to} onClick={onClick} className={ buttonClassName ? `${buttonClassName} content-notification-card-button` : 'content-notification-card-button'}>{buttonText}</LinkButton> }
            { buttonText && onClick && <Button onClick={onClick} className={ buttonClassName ? `${buttonClassName} content-notification-card-button` : 'content-notification-card-button'}>{buttonText}</Button> }
          </div>
      </div>
    </>
  )
}
