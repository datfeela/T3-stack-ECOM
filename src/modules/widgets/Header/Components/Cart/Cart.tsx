import { useEffect } from 'react'
import s from './Cart.module.scss'
import { useGlobalContext } from '~/modules/shared/hooks/useGlobalContext'
import { GlobalReducerActionKind } from '~/modules/app'
import { useInitializeCart } from '../../hooks/useInitializeCart'

export const Cart = () => {
    const { state, dispatch } = useGlobalContext()

    useInitializeCart()
    console.log(state)

    return (
        <div className={s.wrap}>
            <span>cart </span>
            <button
                type='button'
                onClick={() => {
                    dispatch({ type: GlobalReducerActionKind.DELETE_ALL_PRODUCTS })
                }}
            >
                delete all
            </button>
        </div>
    )
}
