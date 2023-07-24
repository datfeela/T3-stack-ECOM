import { useManyProductsData } from '~/modules/shared/hooks/api/useManyProductsData'
import { useInfiniteScroll } from '~/modules/shared/hooks/useInfiniteScroll'
import type { GetManyProductsSortFilters } from '~/modules/shared/types/productTypes'
import type { ProductSortBy } from '~/server/api/apiTypes/productsRouterTypes'
import { mapProductDataFromApi } from '../mappers/mapProductDataFromApi'

interface UseCatalogProductsDataProps {
    sortBy: ProductSortBy
    debouncedSearchQuery: string
    advancedFilters: GetManyProductsSortFilters
}

export const useCatalogProductsData = ({
    sortBy,
    debouncedSearchQuery,
    advancedFilters,
}: UseCatalogProductsDataProps) => {
    const {
        products: data,
        isLoading,
        isFetching,
        getNextPage,
        isAllProductsLoaded,
    } = useManyProductsData({
        searchQuery: debouncedSearchQuery,
        quantity: 16,
        sortBy,
        keepPreviousData: true,
        sortFilters: advancedFilters,
        refetchOnWindowFocus: false,
    })

    const scrollAnchorRef = useInfiniteScroll({
        getMore: () => {
            getNextPage()
        },
        shouldGetMore: !isLoading && !isAllProductsLoaded,
    })

    const productsDataMapped = mapProductDataFromApi(data)

    return {
        productData: productsDataMapped,
        isLoading,
        isFetching,
        scrollAnchorRef,
    }
}
