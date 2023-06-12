import s from './AdminOrders.module.scss'
import { useOrders } from './hooks/useOrders'
import { useInfiniteScroll } from '~/modules/shared/hooks/useInfiniteScroll'
import { useState } from 'react'
import { useDebouncedValue } from '~/modules/shared/hooks/useDebouncedValue'
import type { OrderStatus } from '~/modules/shared/types/orderTypes'
import { Order } from './components/Order/Order'
import { Header } from './components/Header/Header'
import { DotsLoader } from '~/modules/shared/components/Loaders/Loaders'

export const AdminOrders = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const { value: debouncedSearchQuery, isDebouncing } = useDebouncedValue<string>(
        searchQuery,
        250,
    )

    const [ordersStatus, setOrdersStatus] = useState<OrderStatus[]>([])

    const { orders, isLoading, getNextPage, isAllProductsLoaded } = useOrders({
        quantity: 20,
        searchQuery: debouncedSearchQuery,
        refetchOnWindowFocus: true,
        keepPreviousData: true,
        ordersStatus: ordersStatus.length > 0 ? ordersStatus : undefined,
    })

    const scrollAnchorRef = useInfiniteScroll({
        getMore: () => {
            getNextPage()
        },
        shouldGetMore: !isLoading && !isAllProductsLoaded,
    })

    const ordersEls = orders?.map(({ id, status, userId, ...rest }, mapId) => (
        <div
            className={`${s.order} ${mapId % 2 === 0 ? s.order_bg : ''}`}
            key={id}
            ref={mapId === orders.length - 7 ? scrollAnchorRef : undefined}
        >
            <Order id={id} {...rest} status={status as OrderStatus} />
        </div>
    ))

    return (
        <>
            <h1 className={s.title}>Orders</h1>
            <Header
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isLoading={isDebouncing}
                ordersStatus={ordersStatus}
                setOrdersStatus={setOrdersStatus}
            />
            <div>{ordersEls}</div>
            {isLoading ? (
                <div className={s.loader}>
                    <DotsLoader />
                </div>
            ) : null}
        </>
    )
}
