import type { Product, ProductCategory } from '@prisma/client'
import type { ProductType } from '~/modules/shared/types/productTypes'

export const mapProductDataFromApi = (
    data:
        | (Product & {
              categories: ProductCategory[]
          })[]
        | undefined,
) => {
    return data?.map(
        ({
            id,
            name,
            price,
            priceWithoutDiscount,
            verticalImagePath,
            horizontalImagePath,
            productType,
            releaseDate,
        }) => ({
            id,
            name,
            price,
            priceWithoutDiscount,
            verticalImagePath,
            horizontalImagePath,
            productType: productType as ProductType,
            releaseDate,
        }),
    )
}
