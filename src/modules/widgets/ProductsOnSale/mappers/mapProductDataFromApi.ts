import type { ProductFromApiDefault } from '~/modules/entities/product'

export const mapProductsDataFromApi = (products: ProductFromApiDefault[]) => {
    return products.map(({ id, horizontalImagePath, name, price, priceWithoutDiscount }) => ({
        id,
        imgPath: horizontalImagePath,
        name,
        price,
        priceWithoutDiscount,
    }))
}
