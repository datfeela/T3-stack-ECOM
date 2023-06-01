import { createOrder, updateOrderStatus } from './../trpcProcedures/orderMutations'
import {
    getUserOrders,
    getOrderByIdAdmin,
    getManyOrdersAdmin,
} from './../trpcProcedures/orderQueries'
import { createTRPCRouter } from '../trpc'

export const ordersRouter = createTRPCRouter({
    // get
    getUserOrders,
    getOrderByIdAdmin,
    getManyOrdersAdmin,
    // create
    createOrder,
    // update
    updateOrderStatus,
})
