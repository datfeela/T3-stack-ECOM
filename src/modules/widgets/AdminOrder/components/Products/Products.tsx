import type { OrderProduct } from '@prisma/client'
import s from './Products.module.scss'
import Image from '~/modules/shared/components/Image/Image'
import Link from 'next/link'
import { ImagePlaceholder } from '~/modules/shared/components/ImagePlaceholder/ImagePlaceholder'

interface ProductsProps {
    products: OrderProduct[]
}

export const Products = ({ products }: ProductsProps) => {
    const productsEls = products.map((product, id) => (
        <div
            className={`${s.productWrap} ${id % 2 === 1 ? s.productWrap_bg : ''}`}
            key={product.id}
        >
            <Product product={product} />
        </div>
    ))

    return (
        <div className={s.wrap}>
            <div className={s.header}>
                <span>Image</span>
                <span>Name</span>
                <span>Price</span>
                <span>Discount</span>
                <span>Subtotal</span>
                <span>Quantity</span>
                <span>Total</span>
            </div>
            {productsEls}
        </div>
    )
}

interface ProductProps {
    product: OrderProduct
}

export const Product = ({ product }: ProductProps) => {
    const { id, imagePath, name, orderId, price, priceWithoutDiscount, productId, quantity } =
        product

    return (
        <div className={s.product}>
            <div className={s.image}>
                {imagePath ? (
                    <Image src={imagePath} objectFit='cover' orientation='3/4' sizes='120px' />
                ) : (
                    <ImagePlaceholder />
                )}
            </div>

            <Link href={`/game/${productId}`}>{name}</Link>
            {priceWithoutDiscount ? (
                <>
                    <div className={s.price}>{priceWithoutDiscount} y.e</div>
                    <div className={s.price}>{priceWithoutDiscount - price} y.e</div>
                </>
            ) : (
                <>
                    <div></div>
                    <div></div>
                </>
            )}
            <div className={s.price}>{price} y.e</div>
            <div>{quantity}</div>
            <div className={s.price}>{price * quantity} y.e</div>
        </div>
    )
}
