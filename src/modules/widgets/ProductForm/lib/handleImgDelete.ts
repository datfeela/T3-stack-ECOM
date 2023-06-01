import { supabase } from '~/modules/shared/api/supabase'

export const handleImgDelete = async (src: string) => {
    console.log(src)

    try {
        const imgPath = src.split('product-images/')[1] as string

        const { data, error } = await supabase.storage.from('product-images').remove([imgPath])

        return { data, error }
    } catch (e) {
        throw new Error(`something went wrong, can't delete image, error: ${e}`)
    }
}
