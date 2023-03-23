import { getUserWishes } from './../trpcFunctions/userQueries'
import { createTRPCRouter } from '../trpc'

export const userRouter = createTRPCRouter({
    getUserWishes,
})
