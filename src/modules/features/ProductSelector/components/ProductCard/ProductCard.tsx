import Image from 'next/image'
import {} from 'react'
import { ImagePlaceholder } from '~/modules/shared/components/ImagePlaceholder/ImagePlaceholder'
import s from './ProductCard.module.scss'

interface ProductCardPropsBase {
    imgSrc: string | null
    price: number | string
    name: string
}

interface ProductCardPropsWithSelect extends ProductCardPropsBase {
    id: string
    selectedProductId: string
    handleClick: (id: string) => void
}

interface ProductCardPropsWithoutSelect extends ProductCardPropsBase {
    id?: undefined
    selectedProductId?: undefined
    handleClick?: undefined
}

export type ProductCardProps = ProductCardPropsWithSelect | ProductCardPropsWithoutSelect

export const ProductCard = ({
    imgSrc,
    price,
    name,
    id,
    selectedProductId,
    handleClick,
}: ProductCardProps) => {
    const isProductActive = id !== undefined && id === selectedProductId
    const wrapCName = `${s.wrap} ${isProductActive ? s.wrap_active : ''} ${
        !id ? s.wrap_selected : ''
    }`

    return (
        <div
            className={wrapCName}
            onClick={() => {
                handleClick && handleClick(id)
            }}
        >
            <div className={s.image}>
                {imgSrc ? (
                    <Image src={imgSrc} alt={name} fill style={{ objectFit: 'contain' }} />
                ) : (
                    <ImagePlaceholder />
                )}
            </div>
            <span>{name}</span>
            <span>{price} y.e.</span>
            {id ? <input type='checkbox' checked={isProductActive} readOnly /> : null}
        </div>
    )
}
