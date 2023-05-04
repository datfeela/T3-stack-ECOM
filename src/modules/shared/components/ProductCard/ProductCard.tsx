import Link from 'next/link'
import type { ProductType } from '../../types/productTypes'
import s from './ProductCard.module.scss'
import Image from '../Image/Image'
import { ImagePlaceholder } from '../ImagePlaceholder/ImagePlaceholder'
import { Discount } from '../Discount/Discount'
import { ClippedContainer } from '../ClippedContainer/ClippedContainer'
import { SvgSelector } from '../SvgSelector/SvgSelector'
import { ProductQuantityController } from '../ProductQuantityController/ProductQuantityController'
import { useGlobalContext } from '../../hooks/useGlobalContext'
import { GlobalReducerActionKind } from '~/modules/app'
import type { ImageOrientation } from '../../types/types'
import { useMatchMedia } from '../../hooks/useMatchMedia'
import { ButtonDefault } from '../Button/Button'
import { Favorites } from '~/modules/features/Favorites'
import { useRef, useState } from 'react'
import { usePopup } from '../../hooks/usePopup'

interface ProductCardBaseProps {
    id: string
    name: string
    price: number
    priceWithoutDiscount: number | null
    productType: ProductType
    imgPath: string | null
    linkBasePathName?: string
    view:
        | 'default'
        | 'defaultLg'
        | 'horizontal'
        | 'vertical'
        | 'cart'
        | 'cartHeader'
        | 'comingSoon'
        | 'popular'
    size?: 'default' | 'lg'
    imageSizes: string
    // only for cartHeader view
    quantityInCart?: number
}

interface ProductCardWithPopupProps extends ProductCardBaseProps {
    desc: string | null
    categories: string[]
}

interface ProductCardWithoutPopupProps extends ProductCardBaseProps {
    desc?: undefined
    categories?: undefined
}

type ProductCardProps = ProductCardWithPopupProps | ProductCardWithoutPopupProps

export const ProductCard = ({
    id,
    name,
    categories,
    desc,
    price,
    priceWithoutDiscount,
    productType,
    imgPath,
    view,
    linkBasePathName,
    size = 'default',
    imageSizes,
    quantityInCart,
}: ProductCardProps) => {
    const matchMedia = useMatchMedia()
    const { dispatch } = useGlobalContext()
    const { activatePopup, deactivatePopup, isPopupActive } = usePopup()

    const href = linkBasePathName ? `${linkBasePathName}/${id}` : undefined
    let wrapCN = s.wrap
    let imageOrientation: ImageOrientation = '16/9'

    switch (view) {
        case 'default':
            wrapCN += ` ${s.wrap_default}`
            imageOrientation = '16/10'
            break
        case 'defaultLg':
            wrapCN += ` ${s.wrap_defaultLg}`
            imageOrientation = '16/10'
            break
        case 'horizontal':
            wrapCN += ` ${s.wrap_horizontal}`
            break
        case 'vertical':
            break
        case 'cart':
            imageOrientation = '3/4'
            break
        case 'cartHeader':
            wrapCN += ` ${s.wrap_cartHeader}`
            imageOrientation = '3/4'
            break
        case 'comingSoon':
            break
        case 'popular':
            wrapCN += ` ${s.wrap_popular}`
            imageOrientation =
                matchMedia && (matchMedia.isMore768 || matchMedia.isMore960) ? 'unset' : '16/10'
            break
        default:
            break
    }

    return (
        <ClippedContainer
            clipSize={view === 'defaultLg' ? 'lg' : 'md'}
            height='full'
            borderColor={view === 'comingSoon' ? 'yellow' : 'purple'}
            background={view === 'horizontal' || view === 'cart' ? true : false}
            borders={view !== 'cartHeader'}
        >
            <div className={wrapCN}>
                {href && view !== 'defaultLg' && view !== 'popular' ? (
                    <Link className={s.imageLink} href={href}>
                        {imgPath ? (
                            <Image
                                src={imgPath}
                                sizes={imageSizes}
                                orientation={imageOrientation}
                                alt={name}
                            />
                        ) : (
                            <ImagePlaceholder />
                        )}
                    </Link>
                ) : null}
                {href && (view === 'defaultLg' || view === 'popular') ? (
                    <>
                        {imgPath ? (
                            <>
                                {matchMedia &&
                                (matchMedia?.isMore1200 || matchMedia?.isMore1440) ? (
                                    <div onClick={activatePopup}>
                                        <Image
                                            src={imgPath}
                                            sizes={imageSizes}
                                            orientation={imageOrientation}
                                            alt={name}
                                        />
                                    </div>
                                ) : (
                                    <Link className={s.imageLink} href={href}>
                                        <Image
                                            src={imgPath}
                                            sizes={imageSizes}
                                            orientation={imageOrientation}
                                            alt={name}
                                        />
                                    </Link>
                                )}
                            </>
                        ) : (
                            <ImagePlaceholder />
                        )}
                    </>
                ) : null}
                {!href ? (
                    <>
                        {imgPath ? (
                            <div onClick={activatePopup}>
                                <Image
                                    src={imgPath}
                                    sizes={imageSizes}
                                    orientation={imageOrientation}
                                    alt={name}
                                />
                            </div>
                        ) : (
                            <ImagePlaceholder />
                        )}
                    </>
                ) : null}
                <div className={s.bottom}>
                    <div className={s.info}>
                        {href ? (
                            <Link href={href} className={s.name}>
                                {name}
                            </Link>
                        ) : (
                            <span className={s.name}>{name}</span>
                        )}
                        <div className={s.priceRow}>
                            <div className={s.priceBlock}>
                                <div className={s.priceBlockInner}>
                                    <div className={s.price}>{price} y.e</div>
                                    {priceWithoutDiscount ? (
                                        <div className={s.priceWithoutDiscount}>
                                            {priceWithoutDiscount} y.e
                                        </div>
                                    ) : null}
                                </div>
                                {priceWithoutDiscount ? (
                                    <div className={s.discount}>
                                        <Discount
                                            price={price}
                                            priceWithoutDiscount={priceWithoutDiscount}
                                            size={view !== 'cartHeader' ? 'sm' : 'xs'}
                                        />
                                    </div>
                                ) : null}
                            </div>
                            {view === 'cartHeader' && typeof quantityInCart === 'number' ? (
                                <ProductQuantityController
                                    currentQuantity={quantityInCart}
                                    size='sm'
                                    onIncrement={() => {
                                        dispatch({
                                            type: GlobalReducerActionKind.INCREMENT_PRODUCT_QUANTITY,
                                            productId: id,
                                        })
                                    }}
                                    onDecrement={() => {
                                        dispatch({
                                            type: GlobalReducerActionKind.DECREMENT_PRODUCT_QUANTITY,
                                            productId: id,
                                        })
                                    }}
                                />
                            ) : null}
                        </div>
                    </div>
                    {view === 'defaultLg' && href ? (
                        <Link className={s.toProductBtn_lg} href={href}>
                            <ButtonDefault
                                isGlitching={false}
                                color='purple'
                                height='sm'
                                fontW='500'
                            >
                                More details
                            </ButtonDefault>
                        </Link>
                    ) : null}
                </div>
                {isPopupActive && (view === 'defaultLg' || view === 'popular') ? (
                    <div className={s.popup}>
                        <div className={s.name}>{name}</div>
                        <div className={s.desc}>{desc}</div>
                        <div className={s.priceRow}>
                            <div className={s.priceBlock}>
                                <div className={s.priceBlockInner}>
                                    <div className={s.price}>{price} y.e</div>
                                    {priceWithoutDiscount ? (
                                        <div className={s.priceWithoutDiscount}>
                                            {priceWithoutDiscount} y.e
                                        </div>
                                    ) : null}
                                </div>
                                {priceWithoutDiscount ? (
                                    <div className={s.discount}>
                                        <Discount
                                            price={price}
                                            priceWithoutDiscount={priceWithoutDiscount}
                                            size={'xs'}
                                        />
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        {href ? (
                            <Link href={href} className={s.toProductBtn}>
                                <SvgSelector id='arrowDefault' />
                            </Link>
                        ) : null}
                        <div className={s.popup__closeBtn} onClick={deactivatePopup}>
                            <SvgSelector id='close' />
                        </div>
                    </div>
                ) : null}
                {view === 'defaultLg' || view === 'popular' ? (
                    <div className={s.fav}>
                        <Favorites id={id} />
                    </div>
                ) : null}
                {view === 'horizontal' && href ? (
                    <Link href={href} className={s.toProductBtn}>
                        <SvgSelector id='arrowDefault' />
                    </Link>
                ) : null}
                {view === 'cartHeader' ? (
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            dispatch({
                                type: GlobalReducerActionKind.DELETE_PRODUCT,
                                productId: id,
                            })
                        }}
                        className={s.closeBtnSm}
                    >
                        <SvgSelector id='close' />
                    </button>
                ) : null}
            </div>
        </ClippedContainer>
    )
}
