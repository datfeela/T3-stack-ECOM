import { z } from 'zod'
import { adminProcedure, createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

import { getManyProducts, getProductById } from '../trpcFunctions/productsQueries'
import {
    addProduct,
    deleteAllProducts,
    editProduct,
    toggleProductToWishes,
} from '../trpcFunctions/productsMutations'
import {
    addProductValidationSchema,
    editProductValidationSchema,
} from '~/modules/widgets/ProductForm'
import { sortProductsSchema } from '~/modules/shared/lib/validationSchemas'

export const productsRouter = createTRPCRouter({
    // get
    getProductById,
    getManyProducts: publicProcedure
        .input(
            z.object({
                quantity: z.number(),
                searchQuery: z.string().optional(),
                sortBy: sortProductsSchema.optional(),
            }),
        )
        .query(async ({ ctx, input }) => {
            return await getManyProducts({ ctx, input })
        }),
    // create
    addProduct: adminProcedure
        .input(addProductValidationSchema)
        .mutation(async ({ ctx, input }) => {
            return await addProduct({ ctx, input })
        }),
    // update
    editProduct: adminProcedure
        .input(editProductValidationSchema)
        .mutation(async ({ ctx, input }) => {
            return await editProduct({ ctx, input })
        }),
    toggleProductToWishes: protectedProcedure
        .input(z.object({ productId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return await toggleProductToWishes({ ctx, input })
        }),
    // delete
    deleteAllProducts: adminProcedure.mutation(async () => {
        return await deleteAllProducts()
    }),
})
