import { useRouter } from 'next/router'
import { useState } from 'react'
import { api } from '~/modules/shared/api/apiTRPC'
import { mapProductDataToApi } from '../../mappers/mapProductDataToApi'
import type { SubmitFormProps } from '../../ProductFormTypes'
import { ProductForm } from '../ProductForm/ProductForm'

export const AddForm = () => {
    const router = useRouter()

    const [serverError, setServerError] = useState('')

    // submit
    const addProduct = api.products.addProduct.useMutation({
        onError: (e) => {
            console.log(e.message)
            setServerError(e.message)
        },
        onSuccess: async ({ id }) => {
            await router.replace(`/admin/products/edit/${id}?addSuccess=true`)
        },
    })

    const handleFormSubmit = async (props: SubmitFormProps) => {
        const newProductValues = await mapProductDataToApi(props)
        addProduct.mutate(newProductValues)
    }

    return (
        <>
            <h1>Add new product</h1>
            <ProductForm submitForm={handleFormSubmit} serverError={serverError} />
        </>
    )
}
