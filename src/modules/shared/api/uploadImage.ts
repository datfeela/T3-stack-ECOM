import { supabase } from './supabase'

export const uploadImage = async (image: File) => {
    try {
        // const formData = new FormData()
        // formData.append('image', image)

        // const { data }: { data: ImagePathResponse } = await axios.post('/api/image', formData)

        // console.log(data)

        // const imageData = data.data.files.image as formidable.File

        // if (data.status === 'ok') return imageData

        const newFileName = `${Date.now()}${Math.random()}${image.name}`

        const { data, error } = await supabase.storage
            .from('product-images')
            .upload(newFileName, image, {})

        return { data, error }
    } catch (e) {
        throw new Error(`something went wrong, can't upload image, error: ${e}`)
    }
}

// export interface UploadImageRes extends formidable.File {

// }
