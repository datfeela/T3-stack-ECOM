import { ChangeEvent } from 'react'
import { ImagePlaceholder } from '~/modules/shared/components/ImagePlaceholder/ImagePlaceholder'
import s from './AdminProductCard.module.scss'
import { SvgSelector } from '../SvgSelector/SvgSelector'
import Image from '../Image/Image'

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

type ProductCardPropsSort = ProductCardPropsWithSort | ProductCardPropsWithoutSort

type ProductCardPropsWithDelete = ProductCardPropsSort & {
    withDelete: true
    handleDelete: () => void
}

type ProductCardPropsWithoutDelete = ProductCardPropsSort & {
    withDelete?: undefined
    handleDelete?: undefined
}

export type ProductCardProps = ProductCardPropsWithDelete | ProductCardPropsWithoutDelete

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
    withDelete,
    handleDelete,
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
                    <Image sizes='150px' id={`${id}`} src={imgSrc} alt='' objectFit='contain' />
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
                        type='button'
                        onClick={() => {
                            onDelete(id)
                        }}
                        className={s.deleteBtn}
                    >
                        <SvgSelector id='close' />
                    </button>
                </>
            ) : null}
            {withDelete ? (
                <>
                    <button type='button' onClick={handleDelete} className={s.deleteBtn}>
                        <SvgSelector id='close' />
                    </button>
                </>
            ) : null}
        </div>
    )
}
