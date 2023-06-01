import { useEffect } from 'react'
import s from './HeaderCart.module.scss'
import { ClippedContainer } from '~/modules/shared/components/ClippedContainer/ClippedContainer'
import { useInitializeCart } from './hooks/useInitializeCart'
import { useCartPopup } from './hooks/useCartPopup'
import Link from 'next/link'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'
import { useRouter } from 'next/router'
import { useProductsInCart } from '~/modules/shared/hooks/useProductsInCart'
import { useHandleCloseHeaderPopup } from '~/modules/shared/hooks/useHandleCloseHeaderPopup'
import { ProductCard } from '~/modules/shared/components/ProductCard'
import { useSession } from 'next-auth/react'
import { useMatchMedia } from '~/modules/shared/hooks/useMatchMedia'
import { WithLink } from '~/modules/shared/components/WithLink/WithLink'

export const HeaderCart = () => {
    useInitializeCart()
    const { isCartActive, setIsCartActive } = useCartPopup({ containerClassName: `.${s.wrap}` })

    const wrapRef = useHandleCloseHeaderPopup({
        close: () => {
            setIsCartActive(false)
        },
    })

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

    const { data: sessionData } = useSession()
    const matchMedia = useMatchMedia()

    const isDesktop =
        !!matchMedia && !(matchMedia.isMore960 || matchMedia.isMore1200 || matchMedia.isMore1440)

    return (
        <div ref={wrapRef} className={`${s.wrap} ${isCartActive ? s.wrap_active : ''}`}>
            <WithLink href={sessionData?.user ? '/cart' : undefined} withLink={isDesktop}>
                <div
                    onClick={() => {
                        if (totalQuantity === 0) return
                        setIsCartActive(!isCartActive)
                    }}
                    className={`${s.header} ${totalQuantity > 0 ? s.header_active : ''}`}
                >
                    <div className={s.title}>Cart</div>
                    <div
                        className={`${s.header__icon} ${isCartActive ? s.header__icon_active : ''}`}
                    >
                        <SvgSelector id='cart' />
                        {totalQuantity > 0 ? <span>{totalQuantity}</span> : null}
                    </div>
                </div>
            </WithLink>
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
