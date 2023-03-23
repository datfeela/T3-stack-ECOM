import { createTRPCRouter } from '../trpc'
import { adminLogIn } from '../trpcProcedures/adminMutations'

export const adminRouter = createTRPCRouter({
    logIn: adminLogIn,
})
