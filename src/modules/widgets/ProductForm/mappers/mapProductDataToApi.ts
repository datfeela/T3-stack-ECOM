import { handleImgUpload } from '../lib/handleImgUpload'
import type { SubmitFormProps } from '../ProductFormTypes'
import { mapFiltersToApi } from './mapProductFilersToApi'

export async function mapProductDataToApi({
    coverImage,
    miniatureImage,
    verticalOrientImage,
    filters,
    releaseDate,
    ...rest
}: SubmitFormProps) {
    // if typeof image === string, image is old, if obj - it's new
    const coverImagePath = await handleImgUpload(coverImage as File | string | undefined)
    const miniatureImagePath = await handleImgUpload(miniatureImage as File | string | undefined)
    const verticalOrientImagePath = await handleImgUpload(
        verticalOrientImage as File | string | undefined,
    )

    const releaseDateParsed = new Date(releaseDate)

    // reformat values for prisma schema
    const filtersMapped = filters ? mapFiltersToApi(filters) : undefined

    const newProductValues = {
        ...rest,
        filters: filtersMapped,
        coverImagePath,
        miniatureImagePath,
        verticalOrientImagePath,
        releaseDate: releaseDateParsed,
    }

    return newProductValues
}
