import type { FilterName } from '~/modules/shared/types/productTypes'

export type FiltersMappedToFormik = {
    [key in FilterName]: {
        [key: string]: boolean
    }
}

export type FormikFormData = {
    productType: {
        game: boolean
        DLC: boolean
        edition: boolean
    }
    isWithDiscount: boolean | undefined
    priceMin: string | number
    priceMax: string | number
    releaseDateStart: string | number
    releaseDateEnd: string | number
    categories: { [key: string]: boolean }
    filters: FiltersMappedToFormik
}
