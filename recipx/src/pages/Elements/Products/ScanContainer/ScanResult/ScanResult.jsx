import './ScanResult.css'
import { useOutletContext } from 'react-router-dom'
import ContentHeader from '../../../../../components/templateparts/ContentHeader/ContentHeader'
import ContentNotification from '../../../../../components/templateparts/ContentNotification/ContentNotification'
import Controls from '../../../../../components/common/Controls/Controls'
import { useEffect, useState, useContext } from 'react'
import { NotificationsContext } from '../../../../../context/NotificationsContext'
import LinkButton from '../../../../../components/common/LinkButton/LinkButton'
import Loading from '../../../../../components/helpers/Loading/Loading'
import paths from '../../../../../paths'
import useServer from '../../../../../hooks/useServer'

export default function ScanResult () {
  const [productIsInPantry, setProductIsInPantry] = useState(false)
  const { setNotification } = useContext(NotificationsContext)
  const [isLoading, setIsLoading] = useState(true)
  const { codeBar } = useOutletContext()
  const { addProduct, productNameExists } = useServer()
  const [product, setProduct] = useState({})
  const [error404, setError404] = useState(false)

  useEffect(() => {
    if (codeBar) {
      const getProduct = async () => {
        try {
          const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${codeBar}.json`)
          if (response) {
            if (response.status === 404) {
              setError404(true)
            } else {
              const data = await response.json()
              setProduct(
                {
                  ...product,
                  productCode: data.product.code,
                  productName: data.product.product_name_es,
                  productBrand: data.product.brands,
                  productImg: data.product.image_url
                }
              )
              try {
                const productExists = await productNameExists(data.product.product_name_es)
                if (productExists) {
                  setProductIsInPantry(true)
                  setNotification({ message: 'El producto ya existe', type: 'error' })
                } else {
                  setProductIsInPantry(false)
                }
                setIsLoading(false)
              } catch (error) {
                console.log(error)
              }
            }
          }
        } catch (error) {
          console.log(error)
        }
      }
      getProduct()
    }
  }, [codeBar])

  const onClickHandler = async () => {
    const productExists = await productNameExists(product.productName)
    if (productExists) {
      setNotification({ message: 'El producto ya existe', type: 'error' })
    } else {
      addProduct(product)
    }
  }

  return (
    <section className='result container'>
      <div className='content'>
        <ContentHeader
          text={product.productName}
          title='Añadir producto'
        />
        { isLoading
          ? <Loading />
          : <article>
              {
                error404 && <ContentNotification title='Producto no encontrado' />
              }
              {
                productIsInPantry
                  ? Object.keys(product).length > 0 && <ContentNotification
                      title='Este propducto ya existe'
                      text={
                        <div className='result-product'>
                          <h2 className='result-product-name'>{product.productName}</h2>
                          <div className='result-product-brand'>{product.productBrand}</div>
                          <div className='result-product-code'>{product.productCode}</div>
                        </div>
                      }
                    />
                  : Object.keys(product).length > 0 && <ContentNotification
                      text={
                        <div className='result-product'>
                          <h2 className='result-product-name'>{product.productName}</h2>
                          <div className='result-product-brand'>{product.productBrand}</div>
                          <div className='result-product-code'>{product.productCode}</div>
                        </div>
                      }
                      buttonText='Añadir'
                      buttonClassName='button-orange'
                      onClick={() => onClickHandler()}
                    />
              }
            </article>
        }
        <Controls className='result-controls'>
          <LinkButton className='button-blue' to={paths.scan}>Volver a escanear</LinkButton>
          <LinkButton className='button-pink' to={paths.addManually}>Añadir manualmente</LinkButton>
        </Controls>
      </div>
    </section>
  )
}
