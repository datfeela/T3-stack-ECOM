import type { FilterName, ProductFiltersClient } from '~/modules/shared/types/productTypes'

export function mapFiltersToApi(filters: ProductFiltersClient) {
    return Object.entries(filters).map((entry) => {
        const name = entry[0] as FilterName
        const values = entry[1]
        return { name, values }
    })
}
