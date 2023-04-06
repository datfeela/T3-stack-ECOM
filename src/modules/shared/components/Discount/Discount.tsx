import s from './Discount.module.scss'

interface DiscountProps {
    price: number
    priceWithoutDiscount: number
    size?: 'md' | 'sm'
}

export const Discount = ({ price, priceWithoutDiscount, size }: DiscountProps) => {
    const discount = Math.floor((1 - priceWithoutDiscount / price) * 100)

    return <div className={`${s.discount} ${size === 'sm' && s.discount_sm}`}>{discount}%</div>
}
