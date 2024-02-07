import ContentHeader from '../../components/templateparts/ContentHeader/ContentHeader'
import './ImageCredits.css'
import add from './img/add.jpg'
import barcode from './img/barcode.jpg'
import bg from './img/bg.jpg'
import cook from './img/cook.jpg'
import ingredients from './img/ingredients.jpg'
import pantry from './img/pantry.jpg'
import table from './img/table.jpg'

export default function ImageCredits () {
  return (
    <section className="container image-credits">
      <div className="content">
        <ContentHeader
          title='Créditos de las imágenes'
          text='Enlaces a las fuentes de las imágenes usadas en este proyecto.'
        />
        <div className='image-credits-list-wrapper'>
          <ul className='image-credits-list'>
            <li className='image-credits-list-item'>
              <a className='image-credits-list-item-link' href='https://www.freepik.com/free-photo/cropped-image-woman-checking-shopping-list-smartphone-grocery-store_27998658.htm#page=2&query=barcode%20food&position=21&from_view=search&track=ais&uuid=4dec26cd-2d86-4cfe-a6c8-186a5db25e88' rel='noreferrer' target='_blank'>
                <img src={add} title='Add products' />
                <div className='image-credits-list-item-text'>Tonodiaz on Freepik</div>
              </a>
            </li>
            <li className='image-credits-list-item'>
              <a className='image-credits-list-item-link' href='https://www.freepik.com/free-photo/courier-delivering-groceries-home_32482994.htm#page=5&query=barcode%20food&position=0&from_view=search&track=ais&uuid=001396e8-3204-4dd0-86bd-1b6b519effc4' rel='noreferrer' target='_blank'>
                <img src={barcode} title='Add products' />
                <div className='image-credits-list-item-text'>Freepik</div>
              </a>
            </li>
            <li className='image-credits-list-item'>
              <a className='image-credits-list-item-link' href='https://www.freepik.com/free-photo/flat-lay-vegetables-white-background-food-diet-concept_26277178.htm#query=vegan%20white%20background&position=5&from_view=search&track=ais&uuid=64f910e7-ed12-43f6-b8c2-657d6c9e8738' rel='noreferrer' target='_blank'>
                <img src={bg} title='Add products' />
                <div className='image-credits-list-item-text'>pvproductions on Freepik</div>
              </a>
            </li>
            <li className='image-credits-list-item'>
              <a className='image-credits-list-item-link' href='https://pixabay.com/photos/ramen-soup-food-asian-pasta-7238665/' rel='noreferrer' target='_blank'>
                <img src={cook} title='Add products' />
                <div className='image-credits-list-item-text'>Joanna Wielgosz and Beata Furmanek on pixabay</div>
              </a>
            </li>
            <li className='image-credits-list-item'>
              <a className='image-credits-list-item-link' href='https://pixabay.com/photos/vegetables-fruits-food-ingredients-1085063/' rel='noreferrer' target='_blank'>
                <img src={ingredients} title='Add products' />
                <div className='image-credits-list-item-text'>dbreen on pixabay</div>
              </a>
            </li>
            <li className='image-credits-list-item'>
              <a className='image-credits-list-item-link' href='https://pixabay.com/photos/pantry-in-stock-glasses-container-6033796/' rel='noreferrer' target='_blank'>
                <img src={pantry} title='Add products' />
                <div className='image-credits-list-item-text'>Filmbetrachter on pixabay</div>
              </a>
            </li>
            <li className='image-credits-list-item'>
              <a className='image-credits-list-item-link' href='https://pixabay.com/photos/wood-table-breakfast-lunch-dinner-2142309/' rel='noreferrer' target='_blank'>
                <img src={table} title='Social Image' />
                <div className='image-credits-list-item-text'>Goumbik on pixabay</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
