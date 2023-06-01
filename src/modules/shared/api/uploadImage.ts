import { supabase } from './supabase'

export const uploadImage = async (image: File) => {
    try {
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
