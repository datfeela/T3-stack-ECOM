'use client'

import { createContext, useReducer } from 'react'
import type { ContextProps, GlobalReducerAction, GlobalState } from './types/storeTypes'

import { GlobalReducerActionKind } from './types/storeTypes'
import {
    decrementProductQuantity,
    deleteAllProducts,
    deleteProduct,
    incrementProductQuantity,
} from './actions'

const initialState: GlobalState = { products: {}, totalQuantity: 0 }

export const GlobalContext = createContext<ContextProps>({
    state: initialState,
    dispatch: () => null,
})

function globalReducer(state: GlobalState, action: GlobalReducerAction) {
    let res: GlobalState
    switch (action.type) {
        case GlobalReducerActionKind.INCREMENT_PRODUCT_QUANTITY:
            res = incrementProductQuantity({ state, productId: action.productId })
            break
        case GlobalReducerActionKind.DECREMENT_PRODUCT_QUANTITY:
            res = decrementProductQuantity({ state, productId: action.productId })
            break
        case GlobalReducerActionKind.DELETE_PRODUCT:
            res = deleteProduct({ state, productId: action.productId })
            break
        case GlobalReducerActionKind.DELETE_ALL_PRODUCTS:
            res = deleteAllProducts(state)
            break
        case GlobalReducerActionKind.INITIALIZE:
            return action.initialState
        default:
            res = state
            break
    }
    localStorage.setItem('cart', JSON.stringify(res))
    return res
}
//
export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(globalReducer, initialState)

    return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>
}
