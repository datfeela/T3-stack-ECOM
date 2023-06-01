import type { Product as ProductT } from '@prisma/client'
import Link from 'next/link'
import s from './Product.module.scss'
import ImageFill from '~/modules/shared/components/Image/Image'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'
import { DeletePopup } from '../DeletePopup/DeletePopup'

export const Product = ({
    id,
    name,
    price,
    priceWithoutDiscount,
    horizontalImagePath,
}: ProductT) => {
    return (
        <div key={id} className={s.wrap}>
            {horizontalImagePath ? (
                <Link href={`/admin/products/edit/${id}`}>
                    <div className={s.image}>
                        <ImageFill
                            src={horizontalImagePath}
                            alt={name}
                            objectFit='contain'
                            sizes='100px'
                        />
                    </div>
                </Link>
            ) : (
                <div />
            )}
            <Link href={`/admin/products/edit/${id}`}>{name}</Link>
            <span>{price}</span>
            {priceWithoutDiscount ? <span>{priceWithoutDiscount}</span> : <div />}
            <Link href={`/admin/products/edit/${id}`}>
                <button className={`${s.button} ${s.button_edit}`}>
                    <SvgSelector id='edit' />
                </button>
            </Link>
            <DeletePopup id={id} />
        </div>
    )
}
