import type { Product, ProductCategory } from '@prisma/client'
import { api } from '~/modules/shared/api/apiTRPC'
import type { ProductSortBy } from '~/server/api/apiTypes/productsRouterTypes'

interface UseProductsDataProps {
    searchQuery?: string
    quantity?: number
    sortBy?: ProductSortBy
    keepPreviousData?: boolean
    refetchOnWindowFocus?: boolean
}

export const useManyProductsData = ({
    searchQuery,
    quantity = 10,
    keepPreviousData = false,
    refetchOnWindowFocus = true,
    sortBy,
}: UseProductsDataProps) => {
    const { data, isLoading, isError, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage } =
        api.products.getManyProducts.useInfiniteQuery(
            {
                quantity,
                searchQuery: searchQuery?.trim(),
                sortBy,
            },
            {
                keepPreviousData,
                refetchOnWindowFocus,
                getNextPageParam: (lastPage) => lastPage.nextCursor,
            },
        )

    let products = undefined as
        | (Product & {
              categories: ProductCategory[]
          })[]
        | undefined

    data?.pages.forEach((item) => {
        if (!products) products = [...item.products]
        else products = [...products, ...item.products]
    })

    return {
        products,
        isLoading: isFetchingNextPage || isLoading,
        isError,
        isSuccess,
        getNextPage: fetchNextPage,
        isAllProductsLoaded: !hasNextPage,
    }
}
