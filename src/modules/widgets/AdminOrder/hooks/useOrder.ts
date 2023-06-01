import { api } from '~/modules/shared/api/apiTRPC'
import type { OrderStatus } from '~/modules/shared/types/orderTypes'

export const useOrder = (id: string) => {
    const order = api.orders.getOrderByIdAdmin.useQuery(id)

    if (!order.data) return undefined

    return { ...order.data, status: order.data.status as OrderStatus }
}
