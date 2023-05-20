import { useState } from 'react'
import { api } from '~/modules/shared/api/apiTRPC'

export const useDeleteProduct = ({ onDeleteSuccess }: { onDeleteSuccess?: () => void }) => {
    const apiContext = api.useContext()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [serverError, setServerError] = useState(null as null | string)
    const [isServerSuccess, setIsServerSuccess] = useState(false)

    const deleteProduct = api.products.deleteProduct.useMutation({
        onMutate: async () => {
            setIsSubmitting(true)
            await apiContext.products.getManyProducts.cancel()
        },
        onSettled: () => {
            setIsSubmitting(false)
        },
        onError: (e) => {
            setServerError(e.message)
        },
        onSuccess: async () => {
            !!onDeleteSuccess && onDeleteSuccess()
            setIsServerSuccess(true)
            await apiContext.products.getManyProducts.invalidate()
        },
    })

    const handleDeleteProduct = (id: string) => {
        deleteProduct.mutate({ id })
    }

    return { handleDeleteProduct, isSubmitting, serverError, isServerSuccess }
}
