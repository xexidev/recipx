import './HomeStep.css'

export default function HomeStep ({ img, number, title, text }) {
  return (
    <div className={`step step-${number}`}>
      <div className='step-image'>
        <img src={img} title='Obtén reccetas'></img>
      </div>
      <div className='step-text'>
        <strong className='step-text-number'>
          {number}
          <span className='step-dot'>. </span>
        </strong>
        <span className='step-text-text'>{text}</span>
      </div>
    </div>
  )
}
