import s from './Discount.module.scss'

interface DiscountProps {
    price: number
    priceWithoutDiscount: number
    size?: 'md' | 'sm'
    view?: 'square'
}

export const Discount = ({ price, priceWithoutDiscount, size, view }: DiscountProps) => {
    const discount = Math.floor((1 - price / priceWithoutDiscount) * 100)

    return (
        <div
            className={`${s.discount} ${size === 'sm' ? s.discount_sm : ''} ${
                view === 'square' ? s.discount_square : ''
            }`}
        >
            -{discount}%
        </div>
    )
}
