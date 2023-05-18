import { useEffect } from 'react'
import s from './HeaderCart.module.scss'
import { ClippedContainer } from '~/modules/shared/components/ClippedContainer/ClippedContainer'
import { useInitializeCart } from './hooks/useInitializeCart'
import { useCartPopup } from './hooks/useCartPopup'
import Link from 'next/link'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'
import { useRouter } from 'next/router'
import { useProductsInCart } from '~/modules/shared/hooks/useProductsInCart'
import { ProductCard } from '~/modules/shared/components/ProductCard/ProductCard'

export const HeaderCart = () => {
    useInitializeCart()
    const { isCartActive, setIsCartActive } = useCartPopup({ containerClassName: `.${s.wrap}` })

    const {
        productsData,
        totalQuantity,
        incrementProductQuantity,
        decrementProductQuantity,
        deleteProduct,
    } = useProductsInCart()

    useEffect(() => {
        if (totalQuantity === 0 && !!isCartActive) setIsCartActive(false)
    }, [totalQuantity])

    const productsEls = productsData?.map(({ verticalImagePath, quantity, ...el }) => (
        <ProductCard
            view={'cartHeader'}
            key={el.id}
            imgPath={verticalImagePath}
            imageSizes='120px'
            quantityInCart={quantity}
            linkBasePathName='/game'
            onQuantityDecrement={decrementProductQuantity}
            onQuantityIncrement={incrementProductQuantity}
            onProductDelete={deleteProduct}
            {...el}
        />
    ))

    const router = useRouter()

    return (
        <div className={`${s.wrap} ${isCartActive ? s.wrap_active : ''}`}>
            <div
                onClick={() => {
                    if (totalQuantity === 0) return
                    setIsCartActive(!isCartActive)
                }}
                className={`${s.header} ${totalQuantity > 0 ? s.header_active : ''}`}
            >
                <div className={`${s.header__icon} ${isCartActive ? s.header__icon_active : ''}`}>
                    <SvgSelector id='cart' />
                    {totalQuantity > 0 ? <span>{totalQuantity}</span> : null}
                </div>
            </div>
            {totalQuantity > 0 ? (
                <div className={s.popup}>
                    <ClippedContainer
                        backdropFilter={true}
                        corners={{ botLeft: true }}
                        clipSize='md'
                    >
                        <div className={s.popup__header}>
                            <span>Your cart</span>
                            {router.pathname !== '/cart' ? (
                                <Link href='/cart' className={s.toCartButton}>
                                    <span>To Cart</span>
                                    <div className={s.toCartButton__icon}>
                                        <SvgSelector id='arrowDefault' />
                                    </div>
                                </Link>
                            ) : null}
                        </div>
                        <div className={s.popup__content}>{productsEls}</div>
                    </ClippedContainer>
                </div>
            ) : null}
        </div>
    )
}
