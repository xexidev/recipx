import './AddManually.css'
import ContentHeader from '../../../../components/templateparts/ContentHeader/ContentHeader'
import { PackagePlus } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import Input from '../../../../components/common/Input/Input'
import Button from '../../../../components/common/Button/Button'
import useValidation from '../../../../hooks/useValidation'
import useServer from '../../../../hooks/useServer'
import { NotificationsContext } from '../../../../context/NotificationsContext'
import FormCard from '../../../../components/common/FormCard/FormCard'
import Controls from '../../../../components/common/Controls/Controls'
import LinkButton from '../../../../components/common/LinkButton/LinkButton'
import paths from '../../../../paths'

export default function AddManually () {
  const [product, setProduct] = useState({ productName: '', productBrand: '' })
  const [showValidationError, setShowValidationError] = useState(false)
  const { productValidationError, brandValidationError, validateProduct, validateBrand } = useValidation()
  const { productNameExists, addProduct } = useServer()
  const { setNotification } = useContext(NotificationsContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (productValidationError || brandValidationError) {
      setShowValidationError(true)
      return
    }
    try {
      const productExists = await productNameExists(product.productName)
      if (productExists) {
        setNotification({ message: 'El producto ya existe', type: 'error' })
      } else {
        await addProduct(product)
        setProduct({ productName: '', productBrand: '' })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    validateProduct(product.productName)
    validateBrand(product.productBrand)
  }, [product])

  return (
    <section className='add-manually container'>
      <div className='content'>
        <ContentHeader
          title='Añadir ingrediente'
          text='Añade productos a tu despensa'
        />
        <div className='add-manually-form-container'>
          <FormCard onSubmit={(e) => onSubmitHandler(e)}>
            <Input
              hasLabel={true}
              label='Producto o ingrediente'
              type='text'
              required={true}
              onChange={e => setProduct({ ...product, productName: e.target.value })}
              value={product.productName}
              showValidationError={showValidationError}
              showValidationErrorMessage={true}
              validationErrorMessage={productValidationError}
            />
            <Input
              hasLabel={true}
              label='Marca (opcional)'
              type='text'
              onChange={e => setProduct({ ...product, productBrand: e.target.value })}
              value={product.productBrand}
              showValidationError={showValidationError}
              showValidationErrorMessage={true}
              validationErrorMessage={brandValidationError}
            />
            <Button className='form-button'>Añadir</Button>
          </FormCard>
        </div>
        <div className='add-manually-controls'>
          <Controls>
            <LinkButton to={paths.scan} className='button-blue'>Escanear producto</LinkButton>
            <LinkButton to={paths.pantry.replace(':page', '1')} className='button-pink'>Mi despensa</LinkButton>
          </Controls>
        </div>
      </div>
    </section>
  )
}
