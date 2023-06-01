import type { Dispatch, SetStateAction } from 'react'
import s from './Header.module.scss'
import { Search } from '~/modules/shared/components/Search/Search'
import type { OrderStatus } from '~/modules/shared/types/orderTypes'
import { SortItem } from '../SortItem/SortItem'

interface HeaderProps {
    searchQuery: string
    setSearchQuery: Dispatch<SetStateAction<string>>
    isLoading: boolean
    ordersStatus: OrderStatus[]
    setOrdersStatus: Dispatch<SetStateAction<OrderStatus[]>>
}

export const Header = ({
    isLoading,
    searchQuery,
    setSearchQuery,
    ordersStatus,
    setOrdersStatus,
}: HeaderProps) => {
    const handleClick = (status: OrderStatus) => {
        if (ordersStatus.find((item) => item === status))
            setOrdersStatus(ordersStatus.filter((item) => item !== status))
        else setOrdersStatus([...ordersStatus, status])
    }

    const sortEls = ['paidFor', 'canceled', 'received'].map((status, id) => {
        return (
            <SortItem
                key={id}
                status={status as OrderStatus}
                handleClick={handleClick}
                isActive={!!ordersStatus.find((item) => item === status)}
            />
        )
    })

    return (
        <>
            <div className={s.top}>
                <Search
                    value={searchQuery}
                    inputName='orders-search'
                    handleChange={setSearchQuery}
                    isLoading={isLoading}
                />
                <div className={s.sortWrap}>
                    <span>Sort by: </span>
                    {sortEls}
                </div>
            </div>

            <div className={s.row}>
                <span>Id</span>
                <span>Date</span>
                <span>Email</span>
                <span>Price</span>
                <span>Discount</span>
                <span>Total</span>
                <span>Status</span>
            </div>
        </>
    )
}
