import LinkButton from '../../../components/common/LinkButton/LinkButton'
import './HomeNotLogged.css'
import paths from '../../../paths'
import HomeStep from '../HomeStep/HomeStep'
import step1 from './img/step1.jpg'
import step2 from './img/step2.jpg'
import step3 from './img/step3.jpg'

export default function HomeNotLogged () {
  return (
  <div className='home-welcome content'>
    <div className='home-welcome-text'>
      <h1 className='home-welcome-title'>
        Recipx
      </h1>
      <div className='home-welcome-copy'>
        <div className='home-welcome-copy-top'>Tus <span className='text-orange'>ingredientes</span>,</div>
        <div>tus <span className='text-blue'>recetas</span>.</div>
      </div>
      <div className='home-welcome-description'>
        Cocina <strong>deliciosas recetas</strong> con lo que tienes en casa. Sin salir a comprar, sin tener que buscar y al instante.
        <br/>
        <strong>¿Te apetece?</strong>
        <br/>
        <br/>
        <div className='home-welcome-description-test'>
          <h3 className='home-welcome-description-test-title'>Prueba Recipx con las siguientes credenciales:</h3>
          <strong>Email:</strong> recipx@xexi.es
          <br/>
          <strong>Pass:</strong> Recipx1234
        </div>
      </div>
      <div className='home-welcome-buttons'>
        <LinkButton className='button-pink' to={paths.userLogin}>Entrar</LinkButton>
        <LinkButton className='button-orange' to={paths.userRegister}>Regístrate</LinkButton>
      </div>
    </div>
    <div className='home-welcome-graphics'>
      <div className='home-welcome-steps'>
        <HomeStep
          number='1'
          img={step1}
          title='Crea tu despensa'
          text='Crea tu despensa'
        />
        <HomeStep
          number='2'
          img={step2}
          title='Añade ingrendientes'
          text='Añade tus ingredientes'
        />
        <HomeStep
          number='3'
          img={step3}
          title='Obtén reccetas'
          text='Obtén recetas en un clic'
        />
      </div>
    </div>
  </div>
  )
}
