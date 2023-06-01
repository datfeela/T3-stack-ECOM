import { mapImagesToApi } from './mapImagesToApi'
import { handleImgUpload } from '../lib/handleImgUpload'
import type { SubmitFormProps } from '../ProductFormTypes'
import { mapFiltersToApi } from './mapProductFiltersToApi'

export async function mapProductDataToApi({
    coverImage,
    verticalImage,
    horizontalImage,
    detailPageImages,
    filters,
    releaseDate,
    price,
    priceWithoutDiscount,
    quantityInStock,
    ...rest
}: SubmitFormProps) {
    // if typeof image === string, image is old, if obj - it's new
    // !
    const coverImagePathPromise = handleImgUpload(coverImage as File | string | undefined)
    const horizontalImagePathPromise = handleImgUpload(horizontalImage as File | string | undefined)
    const verticalImagePathPromise = handleImgUpload(verticalImage as File | string | undefined)
    const detailPageImagesPathsPromise = mapImagesToApi(
        detailPageImages as (File | string | undefined)[],
    )

    const [coverImagePath, horizontalImagePath, verticalImagePath, detailPageImagesPaths] =
        await Promise.all([
            coverImagePathPromise,
            horizontalImagePathPromise,
            verticalImagePathPromise,
            detailPageImagesPathsPromise,
        ])

    // !
    const releaseDateParsed = new Date(releaseDate)
    const priceNum = Number(price)
    const priceWithoutDiscountNum = priceWithoutDiscount ? Number(priceWithoutDiscount) : null
    const quantityInStockNum = Number(quantityInStock)

    // reformat values for prisma schema
    const filtersMapped = filters ? mapFiltersToApi(filters) : undefined

    const newProductValues = {
        ...rest,
        price: priceNum,
        priceWithoutDiscount: priceWithoutDiscountNum,
        quantityInStock: quantityInStockNum,
        filters: filtersMapped,
        coverImagePath,
        horizontalImagePath,
        verticalImagePath,
        releaseDate: releaseDateParsed,
        detailPageImages: detailPageImagesPaths,
    }

    return newProductValues
}
