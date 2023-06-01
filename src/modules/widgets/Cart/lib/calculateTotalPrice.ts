import type { useProductsInCart } from '../../../shared/hooks/useProductsInCart'

export const calculateTotalPrice = (
    products: ReturnType<typeof useProductsInCart>['productsData'],
) => {
    let totalPrice = 0
    let totalPriceWithoutDiscount = 0

    products?.forEach(({ price, priceWithoutDiscount, quantity }) => {
        totalPrice += price * quantity
        totalPriceWithoutDiscount += (priceWithoutDiscount || price) * quantity
    })

    return {
        totalPrice,
        totalPriceWithoutDiscount:
            totalPrice !== totalPriceWithoutDiscount ? totalPriceWithoutDiscount : undefined,
    }
}
