import type { FilterName, ProductFiltersClient, ProductFiltersFromApi } from '../types/productTypes'

export const mapProductFiltersFromApi = (filters: ProductFiltersFromApi) => {
    const filtersMapped = {} as ProductFiltersClient

    filters.forEach(({ name, values }) => {
        const nameTyped = name as FilterName
        filtersMapped[nameTyped] = values.map((value) => value.value)
    })

    return filtersMapped
}
