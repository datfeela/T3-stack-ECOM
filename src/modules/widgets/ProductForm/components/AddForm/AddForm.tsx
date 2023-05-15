import Head from 'next/head'
import { useAddProduct } from '../../hooks/useAddProduct'
import { ProductForm } from '../ProductForm/ProductForm'

export const AddForm = () => {
    const { isSubmitting, serverError, handleFormSubmit } = useAddProduct()

    return (
        <>
            <Head>
                <title>Add new game</title>
            </Head>
            <h1>Add new product</h1>
            <ProductForm
                submitForm={handleFormSubmit}
                isSubmitting={isSubmitting}
                serverError={serverError}
            />
        </>
    )
}
