import type { FilterName } from '~/server/api/apiTypes/productsRouterTypes'
import type { ProductFiltersFormik } from '../ProductFormTypes'

export function mapFiltersToApi(filters: ProductFiltersFormik) {
    return Object.entries(filters).map((entry) => {
        const name = entry[0] as FilterName
        const values = entry[1]
        return { name, values }
    })
}
