import { useState } from 'react'
import './Input.css'

export default function Input ({ id, className, inputId, inputClassName, type, placeholder, value, name, autoFocus, autoComplete, checked, onChange, required, label, showInfoBullet, infoMessage, showOnFocusMessage, onFocusMessage, showValidationError, showValidationErrorMessage, validationErrorMessage, validationClassName, togglePasswordVisibility }) {
  const [toggablePassword, setToggablePassword] = useState('password')

  const inputBoxClassNameFn = () => {
    return `input-container ${className || ''}${(validationErrorMessage && showValidationError) ? ' error' : ''}`
  }

  const inputClassNameFn = () => {
    return `${inputClassName || ''}${(showInfoBullet && infoMessage) ? ' has-bullet' : ''}`
  }

  const inputTypeFn = () => {
    return (type === 'password' && togglePasswordVisibility) ? toggablePassword : type
  }

  const validationErrorClassNameFn = () => {
    return validationClassName ? `validation-message ${validationClassName}` : 'validation-message'
  }

  const handleCheckBox = (e) => {
    if (e.target.checked) {
      setToggablePassword('text')
    } else {
      setToggablePassword('password')
    }
  }

  return (
    <div id={id} className={inputBoxClassNameFn()}>
      { (label && type !== 'checkbox') && <label htmlFor={inputId}>{label}</label> }
      <input
      id={inputId}
      className={inputClassNameFn()}
      type={inputTypeFn()}
      placeholder={placeholder}
      value={value}
      name={name}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      checked={checked}
      onChange={onChange}
      required={required}
      />
      { (label && type === 'checkbox') && <label htmlFor={inputId}>{label}</label> }
      { (showInfoBullet && infoMessage) &&
        <div className='input-info-container'>
          <div className='input-info-bullet'>?</div>
          <div className='input-info-text'>{infoMessage}</div>
        </div>
      }
      {
        (showOnFocusMessage && onFocusMessage) &&
        <div className='input-onfocus-info'>{onFocusMessage}</div>
      }
      { (showValidationError && showValidationErrorMessage && validationErrorMessage) &&
        <div className={ validationErrorClassNameFn() }>{validationErrorMessage}</div>
      }
      { (type === 'password' && togglePasswordVisibility) &&
        <div className='show-password-container'>
          <input id='show-password' type="checkbox" className="show-password" onChange={e => handleCheckBox(e)} />
          <label htmlFor="show-password">Mostrar contraseña</label>
        </div>
      }
    </div>
  )
}
