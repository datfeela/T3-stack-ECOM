import type { ImageOrientation } from '~/modules/shared/types/types'
import { ImagePlaceholder } from '~/modules/shared/components/ImagePlaceholder/ImagePlaceholder'
import Image from '~/modules/shared/components/Image/Image'

interface ProductImageProps {
    src: string | null
    orientation: ImageOrientation
    sizes: string
    alt: string
}

export const ProductImage = ({ src, sizes, orientation, alt }: ProductImageProps) => {
    if (!src) return <ImagePlaceholder />

    return <Image src={src || ''} sizes={sizes} orientation={orientation} alt={alt} />
}
