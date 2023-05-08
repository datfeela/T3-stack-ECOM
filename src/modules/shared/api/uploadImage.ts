import { supabase } from './supabase'

export const uploadImage = async (image: File) => {
    try {
        // const formData = new FormData()
        // formData.append('image', image)

        // const { data }: { data: ImagePathResponse } = await axios.post('/api/image', formData)

        // const imageData = data.data.files.image as formidable.File

        // if (data.status === 'ok') return imageData

        const newFileName = `${Date.now()}${Math.random()}`

        const { data, error } = await supabase.storage
            .from('product-images')
            .upload(newFileName, image, {})

        return { data, error }
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new Error(
            `HANDLEIMGUPLOAD: something went wrong, can't upload image, error: ${JSON.stringify(
                e,
            )}`,
        )
    }
}

// export interface UploadImageRes extends formidable.File {

// }
