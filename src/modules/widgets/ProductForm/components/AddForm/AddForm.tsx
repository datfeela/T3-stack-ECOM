import { useAddProduct } from '../../hooks/useAddProduct'
import { ProductForm } from '../ProductForm/ProductForm'

export const AddForm = () => {
    const { isSubmitting, serverError, handleFormSubmit } = useAddProduct()

    return (
        <>
            <h1>Add new product</h1>
            <ProductForm
                submitForm={handleFormSubmit}
                isSubmitting={isSubmitting}
                serverError={serverError}
            />
        </>
    )
}
