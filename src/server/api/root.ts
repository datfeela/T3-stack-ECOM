import { adminRouter } from './routers/admin'
import { createTRPCRouter } from '~/server/api/trpc'
import { productsRouter } from './routers/products'
import { categoiesRouter } from './routers/categories'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    admin: adminRouter,
    products: productsRouter,
    categories: categoiesRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
export type AppRouterInput = inferRouterInputs<AppRouter>
export type AppRouterOutput = inferRouterOutputs<AppRouter>
