import { mapProductFiltersFromApi } from './../../../shared/mappers/mapProductFiltersFromApi'
import type { AppRouterOutput } from '~/server/api/root'

import { mapSystemReqFromApi } from './mapSystemReqFromApi'
import type { ProductType } from '~/modules/shared/types/productTypes'
import { mapDateToString } from '~/modules/shared/mappers/mapDateToString'

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
        productType,
    } = productData

    const filtersToFormik = mapProductFiltersFromApi(filters)

    const categoriesToFormik = categories.map(({ name }) => name)
    const characteriscticsToFormik = characteristics.map(({ name, value }) => ({
        name,
        value,
    }))

    const systemRequirementsMinimalMapped = mapSystemReqFromApi(systemRequirementsMinimal)

    const systemRequirementsRecommendedMapped = mapSystemReqFromApi(systemRequirementsRecommended)

    const detailPageImagesMapped = detailPageImages.map((image, id) => ({ value: image.value, id }))
    console.log(detailPageImagesMapped)

    const parsedReleaseDate = mapDateToString(releaseDate)

    const priceStr = String(price)
    const priceWithoutDiscountStr = priceWithoutDiscount ? String(priceWithoutDiscount) : null
    const quantityInStockStr = String(quantityInStock)

    const productTypeTyped = productType as ProductType

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
        systemRequirementsMinimal: systemRequirementsMinimalMapped,
        systemRequirementsRecommended: systemRequirementsRecommendedMapped,
        productType: productTypeTyped,
    }
}
