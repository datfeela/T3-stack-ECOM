import { handleImgUpload } from '../lib/handleImgUpload'

export const mapImagesToApi = async (images: Array<string | File | undefined>) => {
    const imagesPromises = [] as Promise<string>[]
    let imagesPaths = [] as { value: string }[]

    images.forEach((image) => {
        if (!image) return
        const res = handleImgUpload(image)
        imagesPromises.push(res)
    })

    await Promise.all(imagesPromises).then((value) => {
        imagesPaths = value.map((path) => ({
            value: path,
        }))
    })

    return imagesPaths
}
