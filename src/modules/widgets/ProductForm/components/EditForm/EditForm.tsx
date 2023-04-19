import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { api } from '~/modules/shared/api/apiTRPC'
import { WithLoader } from '~/modules/shared/components/WrapWithLoader/WrapWithLoader'
import { mapProductDataFromApi } from '../../mappers/mapProductDataFromApi'
import { mapProductDataToApi } from '../../mappers/mapProductDataToApi'
import type { SubmitFormProps } from '../../ProductFormTypes'
import { ProductForm } from '../ProductForm/ProductForm'

export const EditForm = () => {
    const router = useRouter()
    const { pid, addSuccess } = router.query

    const [serverError, setServerError] = useState('')
    const [serverSuccess, setServerSuccess] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

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
    const apiContext = api.useContext()

    const editProduct = api.products.editProduct.useMutation({
        onMutate: async () => {
            await apiContext.products.getProductById.cancel()
            const optimisticUpdate = apiContext.products.getProductById.getData()

            if (optimisticUpdate) {
                apiContext.products.getProductById.setData(productId, optimisticUpdate)
            }
        },
        onSettled: () => {
            setIsSubmitting(false)
        },
        onError: (e) => {
            setServerSuccess('')
            setServerError(e.message)
        },
        onSuccess: async () => {
            await apiContext.products.getProductById.invalidate()
            setServerSuccess('Product edited successfully!')
        },
    })

    const handleFormSubmit = async (props: SubmitFormProps) => {
        try {
            setIsSubmitting(true)
            setServerSuccess('')
            const newProductValues = await mapProductDataToApi(props)
            editProduct.mutate({ ...newProductValues, id: productId })
        } catch (e) {
            setIsSubmitting(false)
            throw e
        }
    }

    return (
        <>
            <h1>Edit product</h1>
            {serverSuccess ? <div>REFACTOR ME PLS: {serverSuccess}</div> : null}
            <WithLoader loaderType='dots' conditionToShowLoader={!product.data}>
                <ProductForm
                    isSubmitting={isSubmitting}
                    submitForm={handleFormSubmit}
                    serverError={serverError}
                    initialValues={initialValues}
                    isEditForm={true}
                />
            </WithLoader>
        </>
    )
}
