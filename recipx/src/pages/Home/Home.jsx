import './Home.css'
import HomeNotLogged from './HomeNotLogged/HomeNotLogged'
import HomeLogged from './HomeLogged/HomeLogged'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

export default function Home () {
  const { isLoggedFromToken } = useContext(UserContext)

  return (
    <section className='home container'>
      {
        isLoggedFromToken
          ? <HomeLogged />
          : <HomeNotLogged />
      }
    </section>
  )
}
