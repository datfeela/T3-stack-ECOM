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
    const { data, isLoading, isError, isSuccess } = api.products.getManyProducts.useQuery(
        {
            quantity,
            searchQuery: searchQuery?.trim(),
            sortBy,
        },
        {
            keepPreviousData,
            refetchOnWindowFocus,
        },
    )

    return { data, isLoading, isError, isSuccess }
}
