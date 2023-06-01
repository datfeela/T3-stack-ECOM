import type { DeleteAllProductsActionFn, SingleProductActionFn } from './types/storeTypes'

export const incrementProductQuantity: SingleProductActionFn = ({ state, productId }) => {
    const productQuantity = state.products[productId]
        ? (state.products[productId] as number) + 1
        : 1

    return {
        ...state,
        products: {
            ...state.products,
            [productId]: productQuantity,
        },
        totalQuantity: state.totalQuantity + 1,
    }
}

export const decrementProductQuantity: SingleProductActionFn = ({ state, productId }) => {
    const productQuantity =
        state.products[productId] && (state.products[productId] as number) > 0
            ? (state.products[productId] as number) - 1
            : 0

    if (productQuantity > 0) {
        return {
            ...state,
            products: {
                ...state.products,
                [productId]: productQuantity,
            },
            totalQuantity: state.totalQuantity - 1,
        }
    } else {
        const { [productId]: _, ...restProducts } = state.products

        return {
            ...state,
            products: restProducts,
            totalQuantity: state.totalQuantity - 1,
        }
    }
}

export const deleteProduct: SingleProductActionFn = ({ state, productId }) => {
    const { [productId]: value, ...restProducts } = state.products

    return {
        ...state,
        products: restProducts,
        totalQuantity: value ? state.totalQuantity - value : state.totalQuantity,
    }
}

export const deleteAllProducts: DeleteAllProductsActionFn = (state) => {
    return {
        ...state,
        products: {},
        totalQuantity: 0,
    }
}
