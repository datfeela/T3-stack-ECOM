import type { Dispatch } from 'react'

export enum GlobalReducerActionKind {
    INCREMENT_PRODUCT_QUANTITY = 'INCREMENT_PRODUCT_QUANTITY',
    DECREMENT_PRODUCT_QUANTITY = 'DECREMENT_PRODUCT_QUANTITY',
    DELETE_PRODUCT = 'DELETE_PRODUCT',
    DELETE_ALL_PRODUCTS = 'DELETE_ALL_PRODUCTS',
    INITIALIZE = 'INITIALIZE',
}

interface SingleProductAction {
    type: Exclude<
        GlobalReducerActionKind,
        GlobalReducerActionKind.DELETE_ALL_PRODUCTS | GlobalReducerActionKind.INITIALIZE
    >
    productId: string
}

interface DeleteAllProductsAction {
    type: GlobalReducerActionKind.DELETE_ALL_PRODUCTS
}

interface InitAction {
    initialState: GlobalState
    type: GlobalReducerActionKind.INITIALIZE
}

export type SingleProductActionFn = (props: {
    state: GlobalState
    productId: string
}) => GlobalState

export type DeleteAllProductsActionFn = (state: GlobalState) => GlobalState

export type GlobalReducerAction = SingleProductAction | DeleteAllProductsAction | InitAction

export interface GlobalState {
    products: { [productId: string]: number }
    totalQuantity: number
}
export interface ContextProps {
    state: GlobalState
    dispatch: Dispatch<GlobalReducerAction>
}
