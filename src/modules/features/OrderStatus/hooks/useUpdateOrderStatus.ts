import { useState } from 'react'
import { api } from '~/modules/shared/api/apiTRPC'
import type { OrderStatus } from '~/modules/shared/types/orderTypes'

export const useUpdateOrderStatus = () => {
    const apiContext = api.useContext()

    const [isPending, setIsPending] = useState(false)

    const updateStatus = api.orders.updateOrderStatus.useMutation({
        onMutate: async () => {
            setIsPending(true)
            await apiContext.orders.getManyOrdersAdmin.cancel()
            await apiContext.orders.getOrderByIdAdmin.cancel()
        },
        onError: async () => {
            await apiContext.orders.getManyOrdersAdmin.cancel()
            await apiContext.orders.getOrderByIdAdmin.cancel()
        },
        onSuccess: async () => {
            await apiContext.orders.getManyOrdersAdmin.invalidate()
            await apiContext.orders.getOrderByIdAdmin.invalidate()
        },
        onSettled: () => {
            setIsPending(false)
        },
    })

    const handleUpdateStatus = ({ id, status }: HandleUpdateStatusProps) => {
        updateStatus.mutate({ id, newStatus: status })
    }

    return {
        isPending,
        handleUpdateStatus,
    }
}

interface HandleUpdateStatusProps {
    status: OrderStatus
    id: string
}
