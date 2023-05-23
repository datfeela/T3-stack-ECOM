import type { OrderProduct } from '@prisma/client'
import s from './Order.module.scss'
import { parseDateToString } from '~/modules/shared/lib/parseDateToString'
import type { OrderStatus } from '~/modules/shared/types/orderTypes'
import Link from 'next/link'
import { AdminOrderStatus } from '~/modules/features/OrderStatus'

interface OrderProps {
    id: string
    date: Date
    status: OrderStatus
    totalPrice: number
    totalPriceWithoutDiscount: number | null
    deliveryEmail: string
    products: OrderProduct[]
}

export const Order = ({
    id,
    date,
    deliveryEmail,
    status,
    totalPrice,
    totalPriceWithoutDiscount,
}: OrderProps) => {
    const dateParsed = parseDateToString(date)

    return (
        <div className={s.wrap}>
            <div className={s.content}>
                <Link href={`/admin/orders/${id}`} className={s.id}>
                    {id}
                </Link>
                <span>{dateParsed}</span>
                <span>{deliveryEmail}</span>
                {totalPriceWithoutDiscount ? (
                    <>
                        <span>{totalPriceWithoutDiscount} y.e</span>
                        <span>{totalPriceWithoutDiscount - totalPrice} y.e</span>
                    </>
                ) : (
                    <>
                        <span></span>
                        <span></span>
                    </>
                )}
                <span>{totalPrice} y.e</span>
                <AdminOrderStatus id={id} status={status} />
            </div>
        </div>
    )
}
