import Image from 'next/image'
import { ChangeEvent } from 'react'
import { ImagePlaceholder } from '~/modules/shared/components/ImagePlaceholder/ImagePlaceholder'
import s from './AdminProductCard.module.scss'
import { SvgSelector } from '../SvgSelector/SvgSelector'

type ProductCardPropsBase = {
    imgSrc: string | null
    price: number | string
    name: string
    id: string
}

type ProductCardPropsWithSelect = ProductCardPropsBase & {
    isWithSelect: true
    isSelected: boolean
    handleClick: (id: string) => void
}

type ProductCardPropsWithoutSelect = ProductCardPropsBase & {
    isWithSelect?: undefined
    isSelected?: undefined
    handleClick?: undefined
}

type ProductCardPropsSelect = ProductCardPropsWithSelect | ProductCardPropsWithoutSelect

type ProductCardPropsWithSort = ProductCardPropsSelect & {
    withSort: true
    sortNum: number
    onSortChange: (e: ChangeEvent<HTMLInputElement>, id: string) => void
    onDelete: (id: string) => void
}

type ProductCardPropsWithoutSort = ProductCardPropsSelect & {
    withSort?: undefined
    sortNum?: undefined
    onSortChange?: undefined
    onDelete?: undefined
}

export type ProductCardProps = ProductCardPropsWithSort | ProductCardPropsWithoutSort

export const AdminProductCard = ({
    id,
    imgSrc,
    price,
    name,
    isWithSelect,
    isSelected,
    handleClick,
    withSort,
    onSortChange,
    onDelete,
    sortNum,
}: ProductCardProps) => {
    const wrapCName = `${s.wrap} ${isSelected ? s.wrap_active : ''} ${
        !isWithSelect ? s.wrap_selected : ''
    } ${withSort ? s.wrap_withSort : ''}`

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
            {isWithSelect ? <input type='checkbox' checked={isSelected} readOnly /> : null}
            {withSort ? (
                <>
                    <input
                        value={sortNum}
                        onChange={(e) => {
                            onSortChange(e, id)
                        }}
                    />
                    <button
                        onClick={() => {
                            onDelete(id)
                        }}
                        className={s.deleteBtn}
                    >
                        <SvgSelector id='close' />
                    </button>
                </>
            ) : null}
        </div>
    )
}
