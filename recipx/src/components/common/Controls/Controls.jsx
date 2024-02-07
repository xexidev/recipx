import './Controls.css'

export default function Controls ({ children, className }) {
  return (
    <div className={ className ? `${className} controls` : 'controls'}>
      <div className='controls-content'>
        { children }
      </div>
    </div>
  )
}
