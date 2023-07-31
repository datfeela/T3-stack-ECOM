import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDebouncedValue } from '~/modules/shared/hooks/useDebouncedValue'
import type { GetManyProductsSortFilters } from '~/modules/shared/types/productTypes'
import type { ProductSortBy } from '~/server/api/apiTypes/productsRouterTypes'
import type { ProductFiltersToApi } from '../../ProductForm/ProductFormTypes'

export const useCatalogFilters = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const { query } = useRouter()

    const { value: debouncedSearchQuery, isDebouncing } = useDebouncedValue<string>(
        searchQuery,
        250,
    )

    const [sortBy, setSortBy] = useState<ProductSortBy>({
        name: 'popularity',
        value: 'desc',
    })

    const [advancedFilters, setAdvancedFilters] = useState<GetManyProductsSortFilters>({})

    useEffect(() => {
        const filtersWithQueryFilters = JSON.parse(
            JSON.stringify(advancedFilters),
        ) as GetManyProductsSortFilters

        if (query.sale === 'true') {
            filtersWithQueryFilters.isWithDiscount = true
        }
        if (!query.sale) {
            filtersWithQueryFilters.isWithDiscount = false
        }

        filtersWithQueryFilters.categories = setFiltersCategories({
            initialCategories: advancedFilters.categories,
            query: typeof query.category === 'string' ? query.category : undefined,
        })

        filtersWithQueryFilters.filters = setFiltersPlatform({
            initialFilters: filtersWithQueryFilters.filters,
            query: typeof query.platform === 'string' ? query.platform : undefined,
        })

        setAdvancedFilters(filtersWithQueryFilters)
    }, [query])

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

interface SetFiltersCategoriesProps {
    initialCategories?: string[]
    query?: string
}

function setFiltersCategories({ initialCategories, query }: SetFiltersCategoriesProps) {
    if (!query) return initialCategories

    return [query]
}

interface SetFiltersPlatformProps {
    initialFilters?: ProductFiltersToApi
    query?: string
}

function setFiltersPlatform({ initialFilters, query }: SetFiltersPlatformProps) {
    if (!query) return initialFilters
    if (!initialFilters) return [{ name: 'platforms', values: [query] }] as ProductFiltersToApi

    const filters = initialFilters.filter((el) => el.name !== 'platforms')
    return [...filters, { name: 'platforms', values: [query] }] as ProductFiltersToApi
}
