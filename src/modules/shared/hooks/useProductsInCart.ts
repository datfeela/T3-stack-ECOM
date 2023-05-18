import { api } from '~/modules/shared/api/apiTRPC'
import { useGlobalContext } from '~/modules/shared/hooks/useGlobalContext'
import { GlobalReducerActionKind } from '~/modules/app'
import { mapCartProductDataFromApi } from '../mappers/mapCartProductDataFromApi'

export const useProductsInCart = () => {
    const { state, dispatch } = useGlobalContext()

    const productsInCart = Object.entries(state.products).map(([id, quantity]) => ({
        id,
        quantity,
    }))

    const productsData = api.products.getManyProductsByIds.useQuery(
        productsInCart.map(({ id }) => id),
        { keepPreviousData: true },
    ).data

    const productsDataMapped =
        productsData && mapCartProductDataFromApi({ products: productsData, productsInCart })

    const incrementProductQuantity = (productId: string) => {
        dispatch({ type: GlobalReducerActionKind.INCREMENT_PRODUCT_QUANTITY, productId })
    }

    const decrementProductQuantity = (productId: string) => {
        const productQuantity = state.products[productId]
        if (!productQuantity) return

        if (productQuantity === 1)
            dispatch({ type: GlobalReducerActionKind.DELETE_PRODUCT, productId })
        else dispatch({ type: GlobalReducerActionKind.DECREMENT_PRODUCT_QUANTITY, productId })
    }

    const deleteProduct = (productId: string) => {
        dispatch({ type: GlobalReducerActionKind.DELETE_PRODUCT, productId })
    }

    return {
        totalQuantity: state.totalQuantity,
        productsData: productsDataMapped,
        incrementProductQuantity,
        decrementProductQuantity,
        deleteProduct,
    }
}
