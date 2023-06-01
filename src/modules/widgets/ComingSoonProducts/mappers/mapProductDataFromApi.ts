import type { ProductFromApiDefault } from '~/modules/entities/product'

export const mapProductsDataFromApi = (products: ProductFromApiDefault[]) => {
    return products.map(
        ({ id, verticalImagePath, name, price, priceWithoutDiscount, releaseDate }) => ({
            id,
            imgPath: verticalImagePath,
            name,
            price,
            priceWithoutDiscount,
            releaseDate,
        }),
    )
}
