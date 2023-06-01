import { useState } from 'react'
import { api } from '~/modules/shared/api/apiTRPC'

interface UseFavoritesProps {
    productId: string
    userId: string | undefined
}

export const useFavorites = ({ productId, userId }: UseFavoritesProps) => {
    const apiContext = api.useContext()
    const userFavorites = api.user.getUserWishes.useQuery(userId || '').data
    const wishedProduct = userFavorites?.wishedProducts.find((product) => product.id === productId)

    const [isWished, setIsWished] = useState(!!wishedProduct)

    const [isPending, setIsPending] = useState(false)

    const toggleFavorites = api.products.toggleProductToWishes.useMutation({
        onMutate: async () => {
            setIsPending(true)
            setIsWished(!isWished)
            await apiContext.user.getUserWishes.cancel()
            const optimisticUpdate = apiContext.user.getUserWishes.getData()

            if (optimisticUpdate) {
                apiContext.user.getUserWishes.setData(productId, optimisticUpdate)
            }
        },
        onError: () => {
            setIsWished(!isWished)
        },
        onSuccess: async () => {
            await apiContext.user.getUserWishes.invalidate()
        },
        onSettled: () => {
            setIsPending(false)
        },
    })

    const handleClick = () => {
        if (isPending) return
        toggleFavorites.mutate({ action: !!wishedProduct ? 'delete' : 'add', productId })
    }

    return { isWished, isPending, handleClick }
}
