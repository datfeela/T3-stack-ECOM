import s from './Sidebar.module.scss'

interface SidebarProps {
    totalPrice: number
    totalPriceWithoutDiscount: number | null
}

export const Sidebar = ({ totalPrice, totalPriceWithoutDiscount }: SidebarProps) => {
    return (
        <div className={s.wrap}>
            <div className={s.total}>
                <span>TOTAL:</span>
                <span className={s.price}>{totalPrice} y.e</span>
            </div>
            {totalPriceWithoutDiscount ? (
                <div className={s.rows}>
                    <div className={s.row}>
                        <span>Subtotal</span>
                        <span className={s.price}>{totalPriceWithoutDiscount} y.e</span>
                    </div>
                    <div className={s.row}>
                        <span>Discount</span>
                        <span className={s.price}>
                            {totalPriceWithoutDiscount - totalPrice} y.e
                        </span>
                    </div>
                </div>
            ) : null}
            <div className={s.paid}>PAID</div>
        </div>
    )
}
