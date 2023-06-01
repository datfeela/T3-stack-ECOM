import type { ProductFromApiDefault } from '~/modules/entities/product'
import type { ProductType } from '~/modules/shared/types/productTypes'

export const mapDataFromApi = (products: ProductFromApiDefault[]) => {
    return products.map(
        ({
            id,
            name,
            price,
            priceWithoutDiscount,
            productType,
            horizontalImagePath,
            desc,
            categories,
        }) => ({
            id,
            name,
            price,
            priceWithoutDiscount,
            productType: productType as ProductType,
            imgPath: horizontalImagePath,
            desc,
            categories: categories.map(({ name }) => name),
        }),
    )
}
