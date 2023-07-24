import { useState } from 'react'
import { useDebouncedValue } from '~/modules/shared/hooks/useDebouncedValue'
import type { GetManyProductsSortFilters } from '~/modules/shared/types/productTypes'
import type { ProductSortBy } from '~/server/api/apiTypes/productsRouterTypes'

export const useCatalogFilters = () => {
    const [searchQuery, setSearchQuery] = useState('')

    const { value: debouncedSearchQuery, isDebouncing } = useDebouncedValue<string>(
        searchQuery,
        250,
    )

    const [sortBy, setSortBy] = useState<ProductSortBy>({
        name: 'popularity',
        value: 'desc',
    })

    const [advancedFilters, setAdvancedFilters] = useState<GetManyProductsSortFilters>({})

    // console.log(advancedFilters)

    return {
        searchQuery,
        setSearchQuery,
        debouncedSearchQuery,
        isDebouncing,
        sortBy,
        setSortBy,
        advancedFilters,
        setAdvancedFilters,
    }
}
