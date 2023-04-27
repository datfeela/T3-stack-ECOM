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

interface ProductCardBaseProps {
    id: string
    name: string
    price: number
    priceWithoutDiscount: number | null
    productType: ProductType
    imgPath: string | null
    linkBasePathName?: string
    view: 'default' | 'horizontal' | 'vertical' | 'cart' | 'cartHeader' | 'comingSoon'
    size?: 'default' | 'lg'
    imageSizes: string
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
    let wrapCN = s.wrap

    switch (view) {
        case 'default':
            wrapCN += ` ${s.wrap_default}`
            break
        case 'horizontal':
            wrapCN += ` ${s.wrap_horizontal}`
            break
        case 'vertical':
            break
        case 'cart':
            break
        case 'cartHeader':
            wrapCN += ` ${s.wrap_cartHeader}`
            break
        case 'comingSoon':
            break
        default:
            break
    }

    const href = linkBasePathName ? `${linkBasePathName}/${id}` : undefined

    const { dispatch } = useGlobalContext()

    return (
        <ClippedContainer
            clipSize='md'
            height='full'
            borderColor={view === 'comingSoon' ? 'yellow' : 'purple'}
            background={view === 'horizontal' || view === 'cart' ? true : false}
            borders={view !== 'cartHeader'}
        >
            <div className={wrapCN}>
                {href ? (
                    <Link className={s.imageLink} href={href}>
                        {imgPath ? (
                            <Image
                                src={imgPath}
                                sizes={imageSizes}
                                orientation={
                                    view === 'cart' || view === 'cartHeader' ? '3/4' : '16/9'
                                }
                                alt={name}
                            />
                        ) : (
                            <ImagePlaceholder />
                        )}
                    </Link>
                ) : (
                    <>
                        {imgPath ? (
                            <Image
                                src={imgPath}
                                sizes={imageSizes}
                                orientation={
                                    view === 'cart' || view === 'cartHeader' ? '3/4' : '16/9'
                                }
                                alt={name}
                            />
                        ) : (
                            <ImagePlaceholder />
                        )}
                    </>
                )}
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
                            <div className={s.price}>{price} y.e</div>
                            {priceWithoutDiscount ? (
                                <>
                                    <div className={s.priceWithoutDiscount}>
                                        {priceWithoutDiscount} y.e
                                    </div>
                                    <Discount
                                        price={price}
                                        priceWithoutDiscount={priceWithoutDiscount}
                                        size={view !== 'cartHeader' ? 'sm' : 'xs'}
                                    />
                                </>
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
