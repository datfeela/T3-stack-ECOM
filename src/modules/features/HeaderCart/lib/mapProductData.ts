import type { ProductType } from '~/modules/shared/types/productTypes'
import type { ProductWithQuantity } from '../types/types'

export const mapProductData = (product: ProductWithQuantity) => {
    const {
        id,
        name,
        price,
        priceWithoutDiscount,
        quantityInCart,
        productType,
        verticalImagePath,
    } = product

    return {
        id,
        name,
        price,
        priceWithoutDiscount,
        quantityInCart,
        productType: productType as ProductType,
        imgPath: verticalImagePath,
    }
}
