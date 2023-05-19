import { useState } from 'react'
import { api } from '~/modules/shared/api/apiTRPC'

interface HandleAddReviewValues {
    productId: string
    rating: number
    message: string
}

interface UseAddReviewProps {
    quantityToGetOnSuccess: number
    productId: string
    onSuccess: () => void
}

export const useAddReview = ({
    productId,
    quantityToGetOnSuccess,
    onSuccess,
}: UseAddReviewProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [serverError, setServerError] = useState(null as null | string)
    const [isServerSuccess, setIsServerSuccess] = useState(false)

    const apiContext = api.useContext()

    const addReview = api.products.addReviewToProduct.useMutation({
        onMutate: async () => {
            setIsSubmitting(true)
            await apiContext.products.getProductReviewsById.cancel()
            await apiContext.products.getProductReviewsStats.cancel()
            const optimisticUpdate = apiContext.products.getProductReviewsById.getData()

            if (optimisticUpdate) {
                apiContext.products.getProductReviewsById.setData(
                    { id: productId, quantity: quantityToGetOnSuccess },
                    optimisticUpdate,
                )
            }
        },
        onSettled: () => {
            setIsSubmitting(false)
        },
        onError: (e) => {
            setServerError(e.message)
        },
        onSuccess: async () => {
            setIsServerSuccess(true)
            await apiContext.products.getProductReviewsById.invalidate()
            await apiContext.products.getProductReviewsStats.invalidate()
            onSuccess()
        },
    })

    const handleAddReview = (values: HandleAddReviewValues) => {
        addReview.mutate(values)
    }

    return { isSubmitting, serverError, isServerSuccess, setIsServerSuccess, handleAddReview }
}
