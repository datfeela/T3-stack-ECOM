import Link from 'next/link'
import type { ProductType } from '../../types/productTypes'
import s from './ProductCard.module.scss'
import Image from '../Image/Image'
import { ImagePlaceholder } from '../ImagePlaceholder/ImagePlaceholder'
import { Discount } from '../Discount/Discount'
import { ClippedContainer } from '../ClippedContainer/ClippedContainer'
import { SvgSelector } from '../SvgSelector/SvgSelector'

interface ProductCardBaseProps {
    id: string
    name: string
    price: number
    priceWithoutDiscount: number | null
    productType: ProductType
    imgPath: string | null
    linkBasePathName: string
    view: 'default' | 'horizontal' | 'vertical' | 'cart' | 'admin' | 'comingSoon'
    size?: 'default' | 'lg'
    imageSizes: string
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
        case 'admin':
            break
        case 'comingSoon':
            break
        default:
            break
    }

    const href = `${linkBasePathName}/${id}`

    return (
        <ClippedContainer
            clipSize='md'
            height='full'
            borderColor={view === 'comingSoon' ? 'yellow' : 'purple'}
            background={view === 'horizontal' || view === 'cart' ? true : false}
        >
            <div className={wrapCN}>
                <Link className={s.imageLink} href={href}>
                    {imgPath ? (
                        <Image src={imgPath} sizes={imageSizes} orientation='16/9' alt={name} />
                    ) : (
                        <ImagePlaceholder />
                    )}
                </Link>
                <div className={s.info}>
                    <Link href={href} className={s.name}>
                        {name}
                    </Link>
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
                                    size='sm'
                                />
                            </>
                        ) : null}
                    </div>
                </div>
                {view === 'horizontal' ? (
                    <Link href={href} className={s.toProductBtn}>
                        <SvgSelector id='arrowDefault' />
                    </Link>
                ) : null}
            </div>
        </ClippedContainer>
    )
}
