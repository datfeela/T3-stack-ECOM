import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'
import s from './AdminOrder.module.scss'
import { useOrder } from './hooks/useOrder'
import Link from 'next/link'
import { Header } from './components/Header/Header'
import { Products } from './components/Products/Products'
import { Sidebar } from './components/Sidebar/Sidebar'

interface AdminOrderProps {
    id: string
}

export const AdminOrder = (props: AdminOrderProps) => {
    const order = useOrder(props.id)
    if (!order) return null

    const {
        id,
        date,
        deliveryEmail,
        status,
        totalPrice,
        totalPriceWithoutDiscount,
        products,
        User,
    } = order

    return (
        <>
            <div className={s.title}>
                <Link href='/admin/orders'>
                    <SvgSelector id='arrowDefault' />
                </Link>
                <h3>Order {id}</h3>
            </div>
            <Header id={id} date={date} deliveryEmail={deliveryEmail} status={status} User={User} />
            <div className={s.content}>
                <Products products={products} />
                <Sidebar
                    totalPrice={totalPrice}
                    totalPriceWithoutDiscount={totalPriceWithoutDiscount}
                />
            </div>
        </>
    )
}
