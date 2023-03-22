import type { FilterName } from '~/server/api/apiTypes/productsRouterTypes'
import type { AppRouterOutput } from '~/server/api/root'
import type { ProductFiltersFormik } from '../ProductFormTypes'
import { mapDateFromApi } from './mapDateFromApi'

type ProductData = NonNullable<AppRouterOutput['products']['getProductById']>

export function mapProductDataFromApi(productData: ProductData) {
    const {
        // unneeded here
        id,
        popularity,
        rating,
        ratedByCount,
        //
        filters,
        coverImagePath,
        miniatureImagePath,
        verticalOrientImagePath,
        categories,
        characteristics,
        releaseDate,
        ...rest
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
        ...rest,
        categories: categoriesToFormik,
        filters: filtersToFormik,
        characteristics: characteriscticsToFormik,
        coverImage: coverImagePath,
        miniatureImage: miniatureImagePath,
        verticalOrientImage: verticalOrientImagePath,
        releaseDate: parsedReleaseDate,
    }
}
