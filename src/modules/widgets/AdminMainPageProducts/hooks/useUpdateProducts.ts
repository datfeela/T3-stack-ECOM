import { useState } from 'react'
import { api } from '~/modules/shared/api/apiTRPC'
import type { SelectedProduct } from '../types/types'

export const useUpdateProducts = (selectedProducts: SelectedProduct[] | undefined) => {
    const [serverError, setServerError] = useState('')
    const [serverSuccess, setServerSuccess] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const apiContext = api.useContext()

    const updateProducts = api.products.updateMainPageProducts.useMutation({
        onMutate: async () => {
            await apiContext.products.getMainPageProducts.cancel()
            const optimisticUpdate = apiContext.products.getMainPageProducts.getData()

            if (optimisticUpdate) {
                apiContext.products.getMainPageProducts.setData(undefined, optimisticUpdate)
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
            await apiContext.products.getMainPageProducts.invalidate()
            setServerSuccess('Products edited successfully!')
        },
    })

    const handleSave = () => {
        const productsIds = selectedProducts?.map(({ id, sortNum }) => ({ id, sortNum }))
        if (!productsIds) return
        try {
            setIsSubmitting(true)
            setServerSuccess('')
            updateProducts.mutate(productsIds)
        } catch (e) {
            setIsSubmitting(false)
            throw e
        }
    }

    return { serverError, serverSuccess, isSubmitting, handleSave }
}
