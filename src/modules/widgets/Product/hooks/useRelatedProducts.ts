import type { Product as ProductWithoutImages, ProductImagePath } from '@prisma/client'
import { api } from '~/modules/shared/api/apiTRPC'
import type { ProductType } from '~/modules/shared/types/productTypes'

type Product = ProductWithoutImages & {
    detailPageImages: ProductImagePath[]
}

interface UseRelatedProductsProps {
    productId: string
    originalGameId: string | null
    relatedGamesIds: string[] | undefined
}

export const useRelatedProducts = ({
    productId,
    originalGameId,
    relatedGamesIds,
}: UseRelatedProductsProps) => {
    const { data } = api.products.getRelatedProducts.useQuery({
        productId,
        originalGameId,
        relatedGamesIds,
    })

    if (!data) return [] as ReturnType<typeof mapProducts>

    return mapProducts({ products: data })
}

interface MapProductsProps {
    products: Product[] | undefined
}

const mapProducts = ({ products }: MapProductsProps) => {
    return products?.map(
        ({ id, name, price, priceWithoutDiscount, productType, horizontalImagePath }) => {
            return {
                id,
                name,
                price,
                priceWithoutDiscount,
                productType: productType as ProductType,
                imgPath: horizontalImagePath,
            }
        },
    )
}
