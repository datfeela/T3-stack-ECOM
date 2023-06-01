import { useRouter } from 'next/router'
import { useState } from 'react'
import { api } from '~/modules/shared/api/apiTRPC'
import { mapProductDataToApi } from '../mappers/mapProductDataToApi'
import type { SubmitFormProps } from '../ProductFormTypes'

export const useAddProduct = () => {
    const router = useRouter()

    const [serverError, setServerError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // submit
    const addProduct = api.products.addProduct.useMutation({
        onSettled: () => {
            setIsSubmitting(false)
        },
        onError: (e) => {
            console.log(e.message)
            setServerError(e.message)
        },
        onSuccess: async ({ id }) => {
            await router.replace(`/admin/products/edit/${id}?addSuccess=true`)
        },
    })

    const handleFormSubmit = async (props: SubmitFormProps) => {
        try {
            setIsSubmitting(true)
            const newProductValues = await mapProductDataToApi(props)
            addProduct.mutate(newProductValues)
        } catch (e) {
            setIsSubmitting(false)
            throw e
        }
    }

    return {
        isSubmitting,
        serverError,
        handleFormSubmit,
    }
}
