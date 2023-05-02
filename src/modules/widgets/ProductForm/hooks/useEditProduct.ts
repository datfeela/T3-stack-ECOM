import { useState } from 'react'
import { api } from '~/modules/shared/api/apiTRPC'
import { mapProductDataToApi } from '../mappers/mapProductDataToApi'
import type { SubmitFormProps } from '../ProductFormTypes'

export const UseEditProduct = (productId: string) => {
    const [serverError, setServerError] = useState('')
    const [serverSuccess, setServerSuccess] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

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

    return {
        serverError,
        serverSuccess,
        setServerSuccess,
        isSubmitting,
        handleFormSubmit,
    }
}
