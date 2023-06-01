import type { OrderStatus } from '~/modules/shared/types/orderTypes'
import s from './SortItem.module.scss'

interface SortItemProps {
    status: OrderStatus
    handleClick: (status: OrderStatus) => void
    isActive: boolean
}

export const SortItem = ({ status, handleClick, isActive }: SortItemProps) => {
    return (
        <span
            onClick={() => {
                handleClick(status)
            }}
            className={`${s.sort} ${isActive ? s.sort_active : ''} ${
                status === 'paidFor' ? s.sort_paidFor : ''
            } ${status === 'canceled' ? s.sort_canceled : ''} ${
                status === 'received' ? s.sort_received : ''
            }`}
        >
            {status === 'paidFor' ? 'paid for' : status}
        </span>
    )
}
