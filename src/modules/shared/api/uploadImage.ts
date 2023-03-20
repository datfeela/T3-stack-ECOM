import axios from 'axios'
import type formidable from 'formidable'
import type { ImagePathResponse } from '~/pages/api/image'

export const uploadImage = async (image: File) => {
    try {
        const formData = new FormData()
        formData.append('image', image)

        const { data }: { data: ImagePathResponse } = await axios.post('/api/image', formData)

        const imageData = data.data.files.image as formidable.File

        if (data.status === 'ok') return imageData
    } catch (e) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.message)
        } else {
            throw new Error(`something went wrong, can't upload image`)
        }
    }
}

// export interface UploadImageRes extends formidable.File {

// }
