import type { Product } from '@prisma/client'
import type { ProductType } from '~/modules/shared/types/productTypes'

export const mapProductDataFromApi = (products: Product[] | undefined) => {
    if (!products) return undefined

    return products.map(
        ({
            id,
            name,
            price,
            priceWithoutDiscount,
            productType,
            verticalImagePath,
            releaseDate,
        }) => ({
            id,
            name,
            price,
            priceWithoutDiscount,
            imgPath: verticalImagePath,
            productType: productType as ProductType,
            linkBasePathName: '/game',
            releaseDate,
        }),
    )
}
