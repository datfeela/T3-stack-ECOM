import { env } from '~/env.mjs'
import { uploadImage } from '~/modules/shared/api/uploadImage'

export const handleImgUpload = async (image: string | File | undefined) => {
    let coverImgName = typeof image === 'string' ? image : ''

    if (typeof image === 'object') {
        const { data, error } = await uploadImage(image)

        if (error) {
            console.log('ERROR LOG: ', JSON.stringify(error))
            throw new Error(
                `HANDLEIMGUPLOAD: something went wrong, can't upload image, error:`,
                error,
            )
        }
        if (data) coverImgName = env.NEXT_PUBLIC_PRODUCT_IMAGES_PATH + data.path
    }

    return coverImgName
}
