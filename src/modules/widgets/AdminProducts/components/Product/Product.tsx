import type { Product as ProductT } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import s from './Product.module.scss'

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
                        <Image
                            src={horizontalImagePath}
                            alt={name}
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </Link>
            ) : (
                <div />
            )}
            <Link href={`/admin/products/edit/${id}`}>{name}</Link>
            <span>{price}</span>
            {priceWithoutDiscount ? <span>{priceWithoutDiscount}</span> : <div />}
            <Link href={`/admin/products/edit/${id}`}>Edit</Link>
        </div>
    )
}
