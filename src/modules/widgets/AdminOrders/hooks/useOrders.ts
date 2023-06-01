import type { Order, OrderProduct } from '@prisma/client'
import { api } from '~/modules/shared/api/apiTRPC'
import type { OrderStatus } from '~/modules/shared/types/orderTypes'

interface UseOrdersProps {
    searchQuery?: string
    quantity?: number
    ordersStatus?: OrderStatus[]
    keepPreviousData?: boolean
    refetchOnWindowFocus?: boolean
}

export const useOrders = ({
    searchQuery,
    quantity = 10,
    keepPreviousData = false,
    refetchOnWindowFocus = true,
    ordersStatus,
}: UseOrdersProps) => {
    const { data, isLoading, isError, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage } =
        api.orders.getManyOrdersAdmin.useInfiniteQuery(
            {
                quantity,
                searchQuery: searchQuery?.trim(),
                status: ordersStatus,
            },
            {
                keepPreviousData,
                refetchOnWindowFocus,
                getNextPageParam: (lastPage) => lastPage.nextCursor,
            },
        )

    let orders = undefined as
        | (Order & {
              products: OrderProduct[]
          })[]
        | undefined

    data?.pages.forEach((item) => {
        if (!orders) orders = [...item.orders]
        else orders = [...orders, ...item.orders]
    })

    return {
        orders,
        isLoading: isFetchingNextPage || isLoading,
        isError,
        isSuccess,
        getNextPage: fetchNextPage,
        isAllProductsLoaded: !hasNextPage,
    }
}
