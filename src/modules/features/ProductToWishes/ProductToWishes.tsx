import { useState } from 'react'
import { api } from '~/modules/shared/api/apiTRPC'
import s from './ProductToWishes.module.scss'

export interface ProductToWishesProps {
    productId: string
    isActive: boolean
}

export const ProductToWishes = ({ productId, isActive }: ProductToWishesProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isProductInWishes, setIsProductInWishes] = useState(isActive)

    const toWishesToggle = api.products.toggleProductToWishes.useMutation({
        onMutate: () => {
            setIsSubmitting(true)
            setIsProductInWishes(!isProductInWishes)
        },
        onError: () => {
            setIsProductInWishes(!isProductInWishes)
        },
        onSettled: () => {
            setIsSubmitting(false)
        },
    })

    return (
        <button
            disabled={isSubmitting}
            onClick={() => {
                if (isSubmitting) return
                toWishesToggle.mutate({ productId, action: isProductInWishes ? 'delete' : 'add' })
            }}
        >
            {isProductInWishes ? 'REMOVE PRODUCT FROM FAV' : 'ADD PRODUCT TO FAV'}, is disabled:
            {`${isSubmitting}`}
        </button>
    )
}
