import { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../../../context/UserContext'
import { Frown } from 'lucide-react'
import Loading from '../../../../components/helpers/Loading/Loading'
import './Pantry.css'
import ContentHeader from '../../../../components/templateparts/ContentHeader/ContentHeader'
import ContentNotification from '../../../../components/templateparts/ContentNotification/ContentNotification'
import Button from '../../../../components/common/Button/Button'
import Pagination from '../../../../components/templateparts/Pagination/Pagination'
import useServer from '../../../../hooks/useServer'
import usePagination from '../../../../hooks/usePagination'
import paths from '../../../../paths'
import Controls from '../../../../components/common/Controls/Controls'
import LinkButton from '../../../../components/common/LinkButton/LinkButton'

export default function Pantry () {
  const [isLoading, setIsLoading] = useState(true)
  const [pantry, setPantry] = useState()
  const [filteredList, setFilteredList] = useState(null)
  const { getPaginatedList } = usePagination()
  const { isLoggedFromLocal, userIdFromLocal } = useContext(UserContext)
  const { getAllUserProducts, removeProduct } = useServer()
  const { page } = useParams()

  const getList = async () => {
    const newPantry = await getAllUserProducts()
    setPantry(newPantry)
  }

  const getSortedListAZ = (list) => {
    return list.toSorted((a, b) => (a.product_name > b.product_name) ? 1 : ((b.product_name > a.product_name) ? -1 : 0))
  }

  useEffect(() => {
    getList()
  }, [userIdFromLocal, isLoggedFromLocal, page])

  useEffect(() => {
    if (pantry) {
      const sortedList = getSortedListAZ(pantry)
      const paginatedList = getPaginatedList(sortedList, page)
      setFilteredList(paginatedList)
      setIsLoading(false)
    }
  }, [pantry])

  const onClickHandler = async (productId) => {
    await removeProduct(productId)
    getList()
  }

  return (
    <section className='container pantry'>
      <div className='content'>
      <ContentHeader
        title='Despensa'
        text='Organiza tus ingredientes'
      />
      <div className='add-manually-controls'>
        <Controls>
          <LinkButton to={paths.add} className='button-blue'>Añadir producto</LinkButton>
        </Controls>
      </div>
      <div className='pantry-container'>
        { isLoading
          ? <Loading title='Cargando despensa' text='un segundito...' />
          : pantry?.length === 0
            ? <ContentNotification
                icon={<Frown />}
                title='Despensa vacía'
                text='Parece que no hay ningún producto ni ingrediente en tu despensa'
              />
            : filteredList &&
              <div className='pantry-list'>
                <div className='pantry-list-heading'>
                  <h2 className='pantry-list-heading-name'>Producto</h2>
                  <h2 className='pantry-list-heading-remove'>Quitar</h2>
                </div>
                <ul className='pantry-list'>
                    {filteredList.map(product => (
                      <li className='pantry-list-item' key={product.id}>
                        <article className='pantry-list-item-data'>
                          <h3 className='pantry-list-item-data-name'>{product.product_name}</h3>
                          { product.product_brand && <div className='pantry-list-item-data-brand'>{product.product_brand}</div>}
                        </article>
                        <div className='pantry-list-item-remove'>
                          <Button value={product.id} className='button-red remove-button' onClick={(e) => onClickHandler(e.target.value)}>⨉</Button>
                        </div>
                      </li>
                    ))}
                </ul>
                <Pagination unPaginatedList={pantry} />
              </div>
        }
      </div>
        <div className='add-manually-controls'>
          <Controls>
            <LinkButton to={paths.add} className='button-blue'>Añadir producto</LinkButton>
          </Controls>
        </div>
      </div>
    </section>
  )
}
