import { createOrder } from './../trpcProcedures/orderMutations'
import { getUserOrders, getManyOrdersAdmin } from './../trpcProcedures/orderQueries'
import { createTRPCRouter } from '../trpc'

export const ordersRouter = createTRPCRouter({
    // get
    getUserOrders,
    getManyOrdersAdmin,
    // create
    createOrder,
    // update
})
