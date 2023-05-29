import { useRouter } from 'next/router'
import { useState } from 'react'
import { GlobalReducerActionKind } from '~/modules/app/context'
import { api } from '~/modules/shared/api/apiTRPC'
import { useGlobalContext } from '~/modules/shared/hooks/useGlobalContext'

interface HandleCreateOrderProps {
    deliveryEmail: string
    totalPrice: number
    totalPriceWithoutDiscount: number | undefined
}

export const useAddOrder = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [serverError, setServerError] = useState(null as null | string)
    const [isServerSuccess, setIsServerSuccess] = useState(false)
    const { state, dispatch } = useGlobalContext()
    const router = useRouter()

    const createOrder = api.orders.createOrder.useMutation({
        onMutate: () => {
            setIsSubmitting(true)
            setServerError(null)
        },
        onSettled: () => {
            setIsSubmitting(false)
        },
        onError: (e) => {
            setServerError(e.message)
        },
        onSuccess: () => {
            dispatch({ type: GlobalReducerActionKind.DELETE_ALL_PRODUCTS })
            setIsServerSuccess(true)
            router.push('/cart?isSuccess=true')
        },
    })

    const productsToOrder = Object.entries(state.products).map(([id, quantity]) => ({
        id,
        quantity,
    }))

    const handleCreateOrder = ({
        deliveryEmail,
        totalPrice,
        totalPriceWithoutDiscount,
    }: HandleCreateOrderProps) => {
        createOrder.mutate({
            deliveryEmail,
            totalPrice,
            totalPriceWithoutDiscount,
            products: productsToOrder,
        })
    }

    return {
        isSubmitting,
        serverError,
        isServerSuccess,
        handleCreateOrder,
    }
}
