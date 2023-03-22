import { env } from '~/env.mjs'
import { uploadImage } from '~/modules/shared/api/uploadImage'

export const handleImgUpload = async (image: string | File | undefined) => {
    if (!image) return

    let coverImgName = typeof image === 'string' ? image : undefined

    if (typeof image !== 'string') {
        const res = await uploadImage(image)
        if (res) coverImgName = env.NEXT_PUBLIC_PRODUCT_IMAGES_PATH + res.newFilename
    }

    return coverImgName
}
