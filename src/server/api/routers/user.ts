import { getUserWishes } from '../trpcProcedures/userQueries'
import { createTRPCRouter } from '../trpc'

export const userRouter = createTRPCRouter({
    getUserWishes,
})
