import s from './AdminOrderStatus.module.scss'
import { CircleLoader } from '~/modules/shared/components/Loaders/Loaders'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'
import type { OrderStatus } from '~/modules/shared/types/orderTypes'
import { useStatusPopup } from './hooks/useStatusPopup'
import { useUpdateOrderStatus } from './hooks/useUpdateOrderStatus'

interface AdminOrderStatusProps {
    id: string
    status: OrderStatus
}

export const AdminOrderStatus = ({ id, status }: AdminOrderStatusProps) => {
    const { isPending, handleUpdateStatus } = useUpdateOrderStatus()

    const { wrapRef, isPopupActive, setIsPopupActive } = useStatusPopup()

    let clName = `${s.status} ${isPending ? s.status_withIcon : ''} ${
        isPopupActive ? s.status_active : ''
    }`

    switch (status) {
        case 'canceled':
            clName += ` ${s.status_canceled}`
            break
        case 'received':
            clName += ` ${s.status_received}`
            break
        case 'paidFor':
            clName += ` ${s.status_paidFor}`
            break
    }

    return (
        <div ref={wrapRef} className={s.wrap}>
            <span
                onClick={() => {
                    setIsPopupActive(!isPopupActive)
                }}
                className={clName}
            >
                {status === 'paidFor' ? 'paid for' : status}
                {isPending ? <CircleLoader /> : <SvgSelector id='breadcrumbsArrow' />}
            </span>
            <div className={`${s.popup} ${isPopupActive ? s.popup_active : ''}`}>
                <button
                    type='button'
                    className={`${s.status} ${s.status_popup} ${s.status_received} ${
                        status === 'received' ? s.status_hidden : ''
                    }`}
                    onClick={() => {
                        handleUpdateStatus({ id, status: 'received' })
                        setIsPopupActive(false)
                    }}
                >
                    received
                </button>
                <button
                    type='button'
                    className={`${s.status} ${s.status_popup} ${s.status_canceled} ${
                        status === 'canceled' ? s.status_hidden : ''
                    }`}
                    onClick={() => {
                        handleUpdateStatus({ id, status: 'canceled' })
                        setIsPopupActive(false)
                    }}
                >
                    canceled
                </button>
                <button
                    type='button'
                    className={`${s.status} ${s.status_popup} ${s.status_paidFor} ${
                        status === 'paidFor' ? s.status_hidden : ''
                    }`}
                    onClick={() => {
                        handleUpdateStatus({ id, status: 'paidFor' })
                        setIsPopupActive(false)
                    }}
                >
                    paid for
                </button>
            </div>
        </div>
    )
}
