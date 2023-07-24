import type {
    FilterName,
    GetManyProductsSortFilters,
    ProductType,
} from '~/modules/shared/types/productTypes'
import type { FormikFormData } from '../types'

export const mapFiltersDataToApi = (values: FormikFormData) => {
    const {
        priceMin,
        priceMax,
        productType,
        releaseDateStart,
        releaseDateEnd,
        isWithDiscount,
        categories,
        filters,
    } = values

    const releaseDateStartStr = String(releaseDateStart)
    const releaseDateEndStr = String(releaseDateEnd)

    const advancedFilters: GetManyProductsSortFilters = {
        priceMin: !!priceMin ? Number(priceMin) : undefined,
        priceMax: !!priceMax ? Number(priceMax) : undefined,
        releaseDateStart:
            !!releaseDateStart && releaseDateStartStr.length === 4
                ? new Date(`01-01-${releaseDateStart}`)
                : undefined,
        releaseDateEnd:
            !!releaseDateEnd && releaseDateEndStr.length === 4
                ? new Date(`12-31-${releaseDateEnd}`)
                : undefined,
        isWithDiscount,
        categories: mapFormikObjectToApi<string>(categories),
        filters: Object.entries(filters).map(([name, values]) => {
            return {
                name: name as FilterName,
                values: mapFormikObjectToApi<string>(values),
            }
        }),
        productType: mapFormikObjectToApi<ProductType>(productType),
    }

    return advancedFilters
}

function mapFormikObjectToApi<T>(obj: { [key: string]: boolean }) {
    return Object.entries(obj)
        .filter(([name, value]) => value === true)
        .map(([name]) => name as T)
}
