import { mapProductFiltersFromApi } from './../../../shared/mappers/mapProductFiltersFromApi'
import type { AppRouterOutput } from '~/server/api/root'
import { mapDateFromApi } from './mapDateFromApi'

type ProductData = NonNullable<AppRouterOutput['products']['getProductById']>

export function mapProductDataFromApi(productData: ProductData) {
    const {
        filters,
        coverImagePath,
        horizontalImagePath,
        verticalImagePath,
        categories,
        characteristics,
        releaseDate,
        desc,
        name,
        price,
        priceWithoutDiscount,
        quantityInStock,
        ytTrailerPath,
        ytGameplayTrailerPath,
        detailPageImages,
        originalGameId,
        systemRequirementsMinimal,
        systemRequirementsRecommended,
    } = productData

    const filtersToFormik = mapProductFiltersFromApi(filters)

    const categoriesToFormik = categories.map(({ name }) => name)
    const characteriscticsToFormik = characteristics.map(({ name, value }) => ({
        name,
        value,
    }))

    const detailPageImagesMapped = detailPageImages.map((image) => image.value)

    const parsedReleaseDate = mapDateFromApi(releaseDate)

    const priceStr = String(price)
    const priceWithoutDiscountStr = priceWithoutDiscount ? String(priceWithoutDiscount) : null
    const quantityInStockStr = String(quantityInStock)

    return {
        desc,
        name,
        price: priceStr,
        priceWithoutDiscount: priceWithoutDiscountStr,
        quantityInStock: quantityInStockStr,
        ytTrailerPath,
        ytGameplayTrailerPath,
        categories: categoriesToFormik,
        filters: filtersToFormik,
        characteristics: characteriscticsToFormik,
        coverImage: coverImagePath,
        horizontalImage: horizontalImagePath,
        verticalImage: verticalImagePath,
        detailPageImages: detailPageImagesMapped,
        releaseDate: parsedReleaseDate,
        originalGameId,
        systemRequirementsMinimal,
        systemRequirementsRecommended,
    }
}
