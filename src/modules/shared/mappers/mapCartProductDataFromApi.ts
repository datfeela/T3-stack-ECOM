import type { AppRouterOutput } from '~/server/api/root'
import type { ProductType } from '../types/productTypes'

interface MapProductDataFromApiProps {
    products: AppRouterOutput['products']['getManyProductsByIds']
    productsInCart: {
        id: string
        quantity: number
    }[]
}

export const mapCartProductDataFromApi = ({
    products,
    productsInCart,
}: MapProductDataFromApiProps) => {
    const productsMapped = [] as {
        id: string
        productType: ProductType
        name: string
        price: number
        priceWithoutDiscount: number | null
        verticalImagePath: string | null
        horizontalImagePath: string | null
        quantity: number
    }[]

    productsInCart.forEach((productInCart) => {
        const product = products.find((product) => product.id === productInCart.id)
        if (!product) return

        const {
            id,
            productType,
            name,
            price,
            priceWithoutDiscount,
            verticalImagePath,
            horizontalImagePath,
        } = product

        const productMapped = {
            id,
            productType: productType as ProductType,
            name,
            price,
            priceWithoutDiscount,
            verticalImagePath,
            horizontalImagePath,
            quantity:
                productsInCart.find((productInCart) => productInCart.id === id)?.quantity || 0,
        }

        productsMapped.push(productMapped)
    })

    return productsMapped
}
