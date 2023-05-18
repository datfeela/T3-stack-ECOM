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
import type { DefaultColor, ImageOrientation } from '../../types/types'
import { useMatchMedia } from '../../hooks/useMatchMedia'
import { ButtonDefault } from '../Button/Button'
import { Favorites } from '~/modules/features/Favorites'
import { usePopup } from '../../hooks/usePopup'
import { parseDateToString } from '../../lib/parseDateToString'

interface ProductCardBaseProps {
    id: string
    name: string
    price: number
    priceWithoutDiscount: number | null
    imgPath: string | null
    imageSizes: string
    view: 'default' | 'defaultLg' | 'horizontal' | 'vertical' | 'cart' | 'cartHeader' | 'popular'
    size?: 'default' | 'lg'
    productType?: ProductType
    linkBasePathName?: string
    // only for vertical view
    releaseDate?: Date
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
    const { dispatch } = useGlobalContext()
    const { activatePopup, deactivatePopup, isPopupActive } = usePopup()

    const href = linkBasePathName ? `${linkBasePathName}/${id}` : undefined
    let wrapCN = s.wrap
    let imageOrientation: ImageOrientation = '16/9'
    const productTypeParsed = productType === 'game' ? 'base game' : productType
    let containerHeight: 'full' | 'fit' = 'full'

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
        default:
            break
    }

    return (
        <ClippedContainer
            clipSize={view === 'defaultLg' ? 'lg' : 'md'}
            height={containerHeight}
            borderColor={view === 'vertical' ? 'blue' : 'purple'}
            borderColorHover={view === 'vertical' ? 'yellow' : undefined}
            background={view === 'horizontal' || view === 'cart' ? true : false}
            borders={view !== 'cartHeader'}
        >
            <div className={wrapCN}>
                {href && view !== 'defaultLg' && view !== 'popular' ? (
                    <Link
                        className={s.imageLink}
                        href={href}
                        style={{ aspectRatio: imageOrientation }}
                    >
                        {imgPath ? (
                            <Image
                                src={imgPath || ''}
                                sizes={imageSizes}
                                orientation={imageOrientation}
                                alt={name}
                            />
                        ) : (
                            <>
                                <ImagePlaceholder />
                            </>
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
                                        onQuantityIncrement(id)
                                    }}
                                    onDecrement={() => {
                                        onQuantityDecrement(id)
                                    }}
                                />
                            ) : null}
                        </div>
                        {!!productTypeParsed && view === 'cart' ? (
                            <div className={s.productType}>{productTypeParsed}</div>
                        ) : null}
                        {view === 'vertical' && releaseDate ? (
                            <Link href={href || ''} className={s.date}>
                                {parseDateToString(releaseDate)}
                            </Link>
                        ) : null}
                        {view === 'cart' && typeof quantityInCart === 'number' ? (
                            <div className={s.actions}>
                                <ProductQuantityController
                                    currentQuantity={quantityInCart}
                                    size='md'
                                    onIncrement={() => {
                                        onQuantityIncrement(id)
                                    }}
                                    onDecrement={() => {
                                        onQuantityDecrement(id)
                                    }}
                                />
                                <div className={s.actions__bottom}>
                                    {matchMedia &&
                                    (matchMedia.isMore1200 || matchMedia.isMore1440) ? (
                                        <Favorites id={id} view='iconWithText' />
                                    ) : (
                                        <div className={s.favorites_absolute}>
                                            <Favorites id={id} view='icon' />
                                        </div>
                                    )}
                                    <button
                                        className={s.deleteBtn}
                                        type='button'
                                        onClick={() => {
                                            onProductDelete(id)
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ) : null}
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
                        {href ? (
                            <Link href={href} className={s.name}>
                                {name}
                            </Link>
                        ) : (
                            <div className={s.name}>{name}</div>
                        )}
                        <div className={s.desc}>{desc}</div>
                        {categories ? (
                            <div className={s.categories}>
                                {categories.map((name, id) => (
                                    <div className={s.categories__item} key={id}>
                                        {name}
                                    </div>
                                ))}
                            </div>
                        ) : null}
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
        </ClippedContainer>
    )
}
