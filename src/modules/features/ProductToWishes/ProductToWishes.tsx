import { useState } from 'react'
import { api } from '~/modules/shared/api/apiTRPC'
import s from './ProductToWishes.module.scss'

export interface ProductToWishesProps {
    productId: string
    isActive: boolean
}

export const ProductToWishes = ({ productId, isActive }: ProductToWishesProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isButtonActive, setIsButtonActive] = useState(isActive)

    console.log('isButtonActive', isButtonActive)

    const toWishesToggle = api.products.toggleProductToWishes.useMutation({
        onMutate: () => {
            setIsSubmitting(true)
            setIsButtonActive(true)
        },
        onSettled: () => {
            setIsSubmitting(false)
        },
    })

    return (
        <button
            disabled={isSubmitting}
            onClick={() => {
                toWishesToggle.mutate({ productId })
            }}
        >
            ADD PRODUCT TO FAV, is active: {isButtonActive}
        </button>
    )
}
