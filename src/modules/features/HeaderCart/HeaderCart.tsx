import { useEffect } from 'react'
import s from './HeaderCart.module.scss'
import { useGlobalContext } from '~/modules/shared/hooks/useGlobalContext'
import { ClippedContainer } from '~/modules/shared/components/ClippedContainer/ClippedContainer'

import { useInitializeCart } from './hooks/useInitializeCart'
import { useCartPopup } from './hooks/useCartPopup'
import { api } from '~/modules/shared/api/apiTRPC'
import type { ProductWithQuantity } from './types/types'
import { Product } from './components/Product/Product'
import Link from 'next/link'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'

export const HeaderCart = () => {
    const { state } = useGlobalContext()
    const { isCartActive, setIsCartActive } = useCartPopup({ containerClassName: `.${s.wrap}` })

    useInitializeCart()

    useEffect(() => {
        if (state.totalQuantity === 0 && !!isCartActive) setIsCartActive(false)
    }, [state.totalQuantity])

    // ! map data from api ?
    const productsIds = Object.keys(state.products)

    const productsData = api.products.getManyProductsByIds
        .useQuery(productsIds, {
            keepPreviousData: true,
        })
        .data?.map((el) => ({ ...el, quantityInCart: state.products[el.id] })) as
        | ProductWithQuantity[]
        | undefined

    const productsEls = productsData?.map((el) => <Product key={el.id} {...el} />)

    return (
        <div className={`${s.wrap} ${isCartActive ? s.wrap_active : ''}`}>
            <div
                onClick={() => {
                    if (state.totalQuantity === 0) return
                    setIsCartActive(!isCartActive)
                }}
                className={`${s.header} ${state.totalQuantity > 0 ? s.header_active : ''}`}
            >
                <div className={`${s.header__icon} ${isCartActive ? s.header__icon_active : ''}`}>
                    <SvgSelector id='cart' />
                    {state.totalQuantity > 0 ? <span>{state.totalQuantity}</span> : null}
                </div>
            </div>
            {state.totalQuantity > 0 ? (
                <div className={s.popup}>
                    <ClippedContainer
                        backdropFilter={true}
                        corners={{ botLeft: true }}
                        clipSize='md'
                    >
                        <div className={s.popup__header}>
                            <span>Your cart</span>
                            <Link href='/cart' className={s.toCartButton}>
                                <span>To Cart</span>
                                <div className={s.toCartButton__icon}>
                                    <SvgSelector id='arrowDefault' />
                                </div>
                            </Link>
                        </div>
                        <div className={s.popup__content}>{productsEls}</div>
                    </ClippedContainer>
                </div>
            ) : null}
            {/* <button
                type='button'
                onClick={() => {
                    dispatch({ type: GlobalReducerActionKind.DELETE_ALL_PRODUCTS })
                }}
            >
                delete all
            </button> */}
        </div>
    )
}
