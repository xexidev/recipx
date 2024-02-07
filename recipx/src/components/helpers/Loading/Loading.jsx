import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import './Loading.css'

export default function Loading ({ className, title, text }) {
  return (
    <div className={className ? `${className} loading-component` : 'loading-component'}>
      <div>
        <div className='loading-component-animation'>
          <UseAnimations animation={loading} size={36} />
        </div>
        <div className='loading-component-title'>{title}</div>
        <div className='loading-component-text'>{text}</div>
      </div>
    </div>
  )
}
