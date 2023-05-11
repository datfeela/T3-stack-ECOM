import type { Product as ProductT } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import s from './Product.module.scss'
import ImageFill from '~/modules/shared/components/Image/Image'
import { ButtonDefault } from '~/modules/shared/components/Button/Button'

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
                <ButtonDefault color='purple' width='sm' height='sm' isGlitching={false}>
                    Edit
                </ButtonDefault>
            </Link>
        </div>
    )
}
