import type { Product as ProductWithoutImages, ProductImagePath } from '@prisma/client'
import { api } from '~/modules/shared/api/apiTRPC'
import { ProductType } from '~/modules/shared/types/productTypes'

type Product = ProductWithoutImages & {
    detailPageImages: ProductImagePath[]
}

export const useRecommendedProducts = (productId: string) => {
    const { data } = api.products.getRecommendedProductsForProduct.useQuery({
        productId,
        quantity: 10,
    })

    if (!data) return [] as ReturnType<typeof mapProducts>

    return mapProducts(data)
}

interface MapProductsProps {
    categoriesRelatedProducts: Product[] | undefined
    publisherRelatedProducts: Product[] | undefined
}

const mapProducts = ({ publisherRelatedProducts, categoriesRelatedProducts }: MapProductsProps) => {
    const publisherPopular = publisherRelatedProducts?.slice(
        0,
        Math.ceil(publisherRelatedProducts.length / 2),
    )
    const publisherUnpopular = publisherRelatedProducts?.slice(
        Math.ceil(publisherRelatedProducts.length / 2),
    )
    const categoriesPopular = categoriesRelatedProducts?.slice(
        0,
        Math.ceil(categoriesRelatedProducts.length / 2),
    )
    const categoriesUnpopular = categoriesRelatedProducts?.slice(
        Math.ceil(categoriesRelatedProducts.length / 2),
    )

    const productsUnsorted = [
        publisherPopular,
        categoriesPopular,
        publisherUnpopular,
        categoriesUnpopular,
    ]
    const productsSorted = [] as Product[]

    productsUnsorted.forEach((el) => {
        if (!el) return
        productsSorted.push(...el)
    })

    return productsSorted.map(
        ({ id, name, price, priceWithoutDiscount, productType, horizontalImagePath }) => ({
            id,
            name,
            price,
            priceWithoutDiscount,
            productType: productType as ProductType,
            imgPath: horizontalImagePath,
        }),
    )
}
