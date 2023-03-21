import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { api } from '~/modules/shared/api/apiTRPC'
import { WithLoader } from '~/modules/shared/components/WithLoader/WithLoader'
import { mapProductDataFromApi } from '../../mappers/mapProductDataFromApi'
import { mapProductDataToApi } from '../../mappers/mapProductDataToApi'
import type { SubmitFormProps } from '../../ProductFormTypes'
import { ProductForm } from '../ProductForm/ProductForm'

export const EditForm = () => {
    const router = useRouter()
    const { pid, addSuccess } = router.query

    const [serverError, setServerError] = useState('')
    const [serverSuccess, setServerSuccess] = useState('')

    useEffect(() => {
        if (addSuccess === 'true') setServerSuccess('Product added succesfully!')
    }, [addSuccess])

    // get product
    const productId = typeof pid === 'string' ? pid : '0'

    const product = api.products.getProductById.useQuery(productId, {
        refetchOnWindowFocus: false,
    })

    // reformat data into formik initial values
    const initialValues = product.data ? mapProductDataFromApi(product.data) : undefined

    // submit
    const editProduct = api.products.editProduct.useMutation({
        onError: (e) => {
            setServerSuccess('')
            setServerError(e.message)
        },
        onSuccess: () => {
            setServerSuccess('Product edited successfully!')
        },
    })

    const handleFormSubmit = async (props: SubmitFormProps) => {
        const newProductValues = await mapProductDataToApi(props)
        editProduct.mutate({ ...newProductValues, id: productId })
    }

    return (
        <>
            <h1>Edit product</h1>
            {serverSuccess ? <div>REFACTOR ME PLS: {serverSuccess}</div> : null}
            <WithLoader loaderType='dots' conditionToShowLoader={!product.data}>
                <ProductForm
                    submitForm={handleFormSubmit}
                    serverError={serverError}
                    initialValues={initialValues}
                    isEditForm={true}
                />
            </WithLoader>
        </>
    )
}
