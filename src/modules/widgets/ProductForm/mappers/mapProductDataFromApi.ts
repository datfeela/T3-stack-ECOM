import type { FilterName } from '~/server/api/apiTypes/productsRouterTypes'
import type { AppRouterOutput } from '~/server/api/root'
import type { ProductFiltersFormik } from '../ProductFormTypes'
import { mapDateFromApi } from './mapDateFromApi'

type ProductData = NonNullable<AppRouterOutput['products']['getProductById']>

export function mapProductDataFromApi(productData: ProductData) {
    const {
        filters,
        coverImagePath,
        miniatureImagePath,
        verticalOrientImagePath,
        categories,
        characteristics,
        releaseDate,
        desc,
        name,
        price,
        priceWithoutDiscount,
        ytTrailerPath,
    } = productData

    const filtersToFormik = {} as ProductFiltersFormik

    filters.forEach(({ name, values }) => {
        const nameTyped = name as FilterName
        filtersToFormik[nameTyped] = values.map((value) => value.value)
    })

    const categoriesToFormik = categories.map(({ name }) => name)
    const characteriscticsToFormik = characteristics.map(({ name, value }) => ({
        name,
        value,
    }))

    const parsedReleaseDate = mapDateFromApi(releaseDate)

    return {
        desc,
        name,
        price,
        priceWithoutDiscount,
        ytTrailerPath,
        categories: categoriesToFormik,
        filters: filtersToFormik,
        characteristics: characteriscticsToFormik,
        coverImage: coverImagePath,
        miniatureImage: miniatureImagePath,
        verticalOrientImage: verticalOrientImagePath,
        releaseDate: parsedReleaseDate,
    }
}
