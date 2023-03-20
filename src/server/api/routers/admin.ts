import { adminLoginSchema } from '~/modules/entities/admin'
import { createTRPCRouter, publicProcedure } from '../trpc'
import { adminLogIn } from '../trpcFunctions/adminMutations'

export const adminRouter = createTRPCRouter({
    logIn: publicProcedure.input(adminLoginSchema).mutation(async ({ ctx, input }) => {
        return await adminLogIn({ ctx, input })
    }),
})
