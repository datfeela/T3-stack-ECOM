import type { ProductImagePath } from '@prisma/client'

export const mapImagesFromApi = (images: ProductImagePath[]) => {
    return images.map((image) => image.value)
}
