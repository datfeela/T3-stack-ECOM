import { useSession } from 'next-auth/react'
// import { useState } from 'react'
import { api } from '~/modules/shared/api/apiTRPC'
import { mapProductDataFromApi } from '../mappers/mapProductDataFromApi'
import type { Product } from '@prisma/client'

export const useFavorites = () => {
    const { data: sessionData } = useSession()
    const userId = sessionData?.user.id || ''
    // const apiContext = api.useContext()
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
        api.user.getUserWishes.useInfiniteQuery(
            {
                userId,
                quantity: 10,
            },
            {
                getNextPageParam: (lastPage) => lastPage.nextCursor,
                keepPreviousData: true,
                refetchOnWindowFocus: true,
            },
        )

    let products = undefined as Product[] | undefined

    data?.pages.forEach((item) => {
        if (!item.products) return

        if (!products) products = [...item.products]
        else products = [...products, ...item.products]
    })

    const productsData = mapProductDataFromApi(products)

    return {
        productsData,
        isLoading: isFetchingNextPage || isLoading,
        isError,
        getNextPage: fetchNextPage,
        isAllProductsLoaded: !hasNextPage,
    }

    // const wishedProduct = userFavorites?.wishedProducts.find((product) => product.id === productId)

    // const [isWished, setIsWished] = useState(!!wishedProduct)

    // const [isPending, setIsPending] = useState(false)

    // const toggleFavorites = api.products.toggleProductToWishes.useMutation({
    //     onMutate: async () => {
    //         setIsPending(true)
    //         setIsWished(!isWished)
    //         await apiContext.user.getUserWishes.cancel()
    //         const optimisticUpdate = apiContext.user.getUserWishes.getData()

    //         if (optimisticUpdate) {
    //             apiContext.user.getUserWishes.setData(productId, optimisticUpdate)
    //         }
    //     },
    //     onError: () => {
    //         setIsWished(!isWished)
    //     },
    //     onSuccess: async () => {
    //         await apiContext.user.getUserWishes.invalidate()
    //     },
    //     onSettled: () => {
    //         setIsPending(false)
    //     },
    // })

    // const handleClick = () => {
    //     if (isPending) return
    //     toggleFavorites.mutate({ action: !!wishedProduct ? 'delete' : 'add', productId })
    // }
}
