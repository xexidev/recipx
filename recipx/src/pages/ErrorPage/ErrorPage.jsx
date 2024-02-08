import { useRouteError } from 'react-router-dom'
import ContentHeader from '../../components/templateparts/ContentHeader/ContentHeader'
import ContentNotification from '../../components/templateparts/ContentNotification/ContentNotification'
import { Frown } from 'lucide-react'
import paths from '../../paths'
import './ErrorPage.css'

export default function ErrorPage () {
  const error = useRouteError()
  console.error(error)

  return (
    <section className='error-page container'>
      <div className='content'>
        <ContentHeader
          title='¡Ups!'
          text='Ha ocurrido un error'
        />
        <ContentNotification
              className='get-recipe-no-credits'
              icon={<Frown />}
              title={error.statusText || error.message}
              buttonClassName='button-blue'
              buttonText='Volver al inicio'
              to={paths.home}
        />
      </div>
    </section>
  )
}
