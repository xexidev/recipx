import ContentHeader from '../../../../components/templateparts/ContentHeader/ContentHeader'
import { ScanBarcode, Keyboard } from 'lucide-react'
import paths from '../../../../paths'
import CardLink from '../../../../components/common/CardLink/CardLink'
import './Add.css'
import barcode from './img/barcode.jpg'
import add from './img/add.jpg'

export default function Add () {
  return (
    <section className='add container'>
      <div className='content'>
        <ContentHeader
          title='Añade nuevos ingredientes'
        />
        <div className='add-buttons'>
          <CardLink
            icon={<ScanBarcode strokeWidth={2} />}
            image={barcode}
            title='Con código de barras'
            description='Escanea el código de barras con tu cámara y añade el producto automáticamente.'
            className='add-buttons-button'
            to={paths.scan}
          />
          <CardLink
            icon={<Keyboard strokeWidth={2} />}
            image={add}
            title='Añadir manualmente'
            description='Para los casos en el que no existe un código de barras o no funciona correctamente.'
            className='add-buttons-button'
            to={paths.addManually}
          />
        </div>
      </div>
    </section>
  )
}
