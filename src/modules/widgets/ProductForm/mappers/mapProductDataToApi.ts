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
<<<<<<< HEAD
=======
    const uploadPromises = [] as Promise<{ error: any; data: any }>[]

>>>>>>> d6b0d718456649efb5ce57467701d2eb8079d9ea
    const coverImagePathPromise = handleImgUpload(coverImage as File | string | undefined)
    const horizontalImagePathPromise = handleImgUpload(horizontalImage as File | string | undefined)
    const verticalImagePathPromise = handleImgUpload(verticalImage as File | string | undefined)
    const detailPageImagesPathsPromise = mapImagesToApi(
        detailPageImages as Array<File | string | undefined>,
    )

    const [coverImagePath, horizontalImagePath, verticalImagePath, detailPageImagesPaths] =
<<<<<<< HEAD
        await Promise.all([
            coverImagePathPromise,
            horizontalImagePathPromise,
            verticalImagePathPromise,
            detailPageImagesPathsPromise,
        ])
=======
        await Promise.all(uploadPromises)
>>>>>>> d6b0d718456649efb5ce57467701d2eb8079d9ea

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
