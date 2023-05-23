import type { OrderStatus } from '~/modules/shared/types/orderTypes'
import s from './Header.module.scss'
import type { User } from '@prisma/client'
import { parseDateToString } from '~/modules/shared/lib/parseDateToString'
import { AdminOrderStatus } from '~/modules/features/OrderStatus'

interface HeaderProps {
    id: string
    date: Date
    deliveryEmail: string
    status: OrderStatus
    User: User | null
}

export const Header = ({ id, date, deliveryEmail, status, User }: HeaderProps) => {
    console.log(User)

    return (
        <div className={s.header}>
            <div className={s.row}>
                <span className={s.title}>Status</span>
                <span className={s.title}>Date</span>
                <span className={s.title}>Customer</span>
            </div>
            <div className={s.row}>
                <div className={s.item}>
                    <AdminOrderStatus id={id} status={status} />
                </div>
                <div className={s.item}>
                    <span>{parseDateToString(date)}</span>
                </div>
                <div className={s.item}>
                    <div className={s.user}>
                        {User ? <span className={s.user_name}>{User.name}</span> : null}
                        <span className={s.user_email}>{deliveryEmail}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
