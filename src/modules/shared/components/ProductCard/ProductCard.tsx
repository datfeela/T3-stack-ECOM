import Link from 'next/link'
import type { ProductType } from '../../types/productTypes'
import s from './ProductCard.module.scss'
import { SvgSelector } from '../SvgSelector/SvgSelector'
import type { ImageOrientation } from '../../types/types'
import { useMatchMedia } from '../../hooks/useMatchMedia'
import { Favorites } from '~/modules/features/Favorites'
import { usePopup } from '../../hooks/usePopup'
import type { View } from './types/types'
import { WithClip } from './components/WithClip/WithClip'
import { ProductImage } from './components/ProductImage/ProductImage'
import { WithImageLink } from './components/WithImageLink/WithImageLink'
import { Popup } from './components/Popup/Popup'
import { Info } from './components/Info/Info'

interface ProductCardBaseProps {
    id: string
    name: string
    price: number
    priceWithoutDiscount: number | null
    imgPath: string | null
    imageSizes: string
    view: View
    size?: 'default' | 'lg'
    productType?: ProductType
    linkBasePathName?: string
    // only for vertical view
    releaseDate?: Date
    withClip?: boolean
}

type ProductCardWithPopup = ProductCardBaseProps & {
    desc: string | null
    categories: string[]
}

type ProductCardWithoutPopup = ProductCardBaseProps & {
    desc?: undefined
    categories?: undefined
}

type ProductCardPopup = ProductCardWithPopup | ProductCardWithoutPopup

type ProductCardWithQuantity = ProductCardPopup & {
    quantityInCart: number
    onQuantityIncrement: (productId: string) => void
    onQuantityDecrement: (productId: string) => void
    onProductDelete: (productId: string) => void
}

type ProductCardWithoutQuantity = ProductCardPopup & {
    quantityInCart?: undefined
    onQuantityIncrement?: undefined
    onQuantityDecrement?: undefined
    onProductDelete?: undefined
}

type ProductCardProps = ProductCardWithQuantity | ProductCardWithoutQuantity

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
    releaseDate,
    quantityInCart,
    onProductDelete,
    onQuantityDecrement,
    onQuantityIncrement,
}: ProductCardProps) => {
    const matchMedia = useMatchMedia()
    const { activatePopup, deactivatePopup, isPopupActive } = usePopup()

    const href = linkBasePathName ? `${linkBasePathName}/${id}` : undefined
    let wrapCN = s.wrap
    let imageOrientation: ImageOrientation = '16/9'
    const productTypeParsed = productType === 'game' ? 'base game' : productType
    let containerHeight: 'full' | 'fit' = 'full'
    let withClip = true

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
            wrapCN += ` ${s.wrap_vertical}`
            imageOrientation = '4/5'
            break
        case 'cart':
            wrapCN += ` ${s.wrap_cart}`
            imageOrientation = matchMedia && matchMedia.isLess480 ? '16/9' : '3/4'
            containerHeight = 'fit'
            break
        case 'cartHeader':
            wrapCN += ` ${s.wrap_cartHeader}`
            imageOrientation = '3/4'
            break
        case 'popular':
            wrapCN += ` ${s.wrap_popular}`
            imageOrientation =
                matchMedia && (matchMedia.isMore768 || matchMedia.isMore960) ? 'unset' : '16/10'
            break
        case 'search':
            wrapCN += ` ${s.wrap_search}`
            imageOrientation = '16/10'
            withClip = false
            break
        default:
            break
    }

    return (
        <WithClip view={view} withClip={withClip} containerHeight={containerHeight}>
            <div className={wrapCN}>
                {/* image */}
                {view !== 'defaultLg' && view !== 'popular' ? (
                    <WithImageLink href={href} imageOrientation={imageOrientation}>
                        <ProductImage
                            src={imgPath}
                            alt={name}
                            orientation={imageOrientation}
                            sizes={imageSizes}
                        />
                    </WithImageLink>
                ) : null}
                {view === 'defaultLg' || view === 'popular' ? (
                    <>
                        {matchMedia && (matchMedia?.isMore1200 || matchMedia?.isMore1440) ? (
                            <div className={s.image} onClick={activatePopup}>
                                <ProductImage
                                    src={imgPath}
                                    alt={name}
                                    orientation={imageOrientation}
                                    sizes={imageSizes}
                                />
                            </div>
                        ) : (
                            <WithImageLink href={href} imageOrientation={imageOrientation}>
                                <ProductImage
                                    src={imgPath}
                                    alt={name}
                                    orientation={imageOrientation}
                                    sizes={imageSizes}
                                />
                            </WithImageLink>
                        )}
                    </>
                ) : null}
                {/* info */}
                {!onProductDelete &&
                !quantityInCart &&
                !onQuantityIncrement &&
                !onQuantityDecrement ? (
                    <Info
                        id={id}
                        name={name}
                        href={href}
                        view={view}
                        price={price}
                        priceWithoutDiscount={priceWithoutDiscount}
                        productTypeParsed={productTypeParsed}
                        releaseDate={releaseDate}
                        onProductDelete={onProductDelete}
                        quantityInCart={quantityInCart}
                        onQuantityIncrement={onQuantityIncrement}
                        onQuantityDecrement={onQuantityDecrement}
                    />
                ) : null}
                {!!onProductDelete &&
                !!quantityInCart &&
                !!onQuantityIncrement &&
                !!onQuantityDecrement ? (
                    <Info
                        id={id}
                        name={name}
                        href={href}
                        view={view}
                        price={price}
                        priceWithoutDiscount={priceWithoutDiscount}
                        productTypeParsed={productTypeParsed}
                        releaseDate={releaseDate}
                        onProductDelete={onProductDelete}
                        quantityInCart={quantityInCart}
                        onQuantityIncrement={onQuantityIncrement}
                        onQuantityDecrement={onQuantityDecrement}
                    />
                ) : null}
                {/* absolute feats */}
                {isPopupActive && (view === 'defaultLg' || view === 'popular') ? (
                    <Popup
                        name={name}
                        desc={desc}
                        href={href}
                        categories={categories}
                        price={price}
                        priceWithoutDiscount={priceWithoutDiscount}
                        deactivatePopup={deactivatePopup}
                    />
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
                {view === 'cartHeader' && !!onProductDelete ? (
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onProductDelete(id)
                        }}
                        className={s.closeBtnSm}
                    >
                        <SvgSelector id='close' />
                    </button>
                ) : null}
            </div>
        </WithClip>
    )
}
