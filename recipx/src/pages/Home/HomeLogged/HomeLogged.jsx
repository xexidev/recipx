import './HomeLogged.css'
import CardLink from '../../../components/common/CardLink/CardLink'
import { DoorOpen, Carrot, CookingPot } from 'lucide-react'
import ContentHeader from '../../../components/templateparts/ContentHeader/ContentHeader'
import paths from '../../../paths'
import cook from './img/cook.jpg'
import ingredients from './img/ingredients.jpg'
import pantry from './img/pantry.jpg'

export default function HomeLogged () {
  return (
  <div className='home-logged content'>
    <ContentHeader
      title='¿Te apetece algo delicioso?'
    />
    <div className='home-logged-buttons'>
      <CardLink
        icon={<CookingPot strokeWidth={2} />}
        image={cook}
        title='¡A cocinar!'
        description='Genera recetas con los ingredientes de tu despensa.'
        className='home-logged-button'
        to={paths.getRecipe}
      />
      <CardLink
        icon={<Carrot strokeWidth={2} />}
        image={ingredients}
        title='Ingredientes'
        description='Añade nuevos ingredientes a tu despensa.'
        className='home-logged-button'
        to={paths.add}
      />
      <CardLink
        icon={<DoorOpen strokeWidth={2} />}
        image={pantry}
        title='Despensa'
        description='Mantén organizada tu despensa.'
        className='home-logged-button'
        to={paths.pantry.replace(':page', '1')}
      />
    </div>
  </div>
  )
}
