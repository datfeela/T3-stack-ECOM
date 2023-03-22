import { z } from 'zod'
import { adminProcedure, createTRPCRouter, publicProcedure } from '../trpc'

import { getManyProducts, getProductById } from '../trpcFunctions/productsQueries'
import { addProduct, editProduct } from '../trpcFunctions/productsMutations'
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
        .query(async (cfg) => {
            return await getManyProducts(cfg)
        }),
    // put
    addProduct: adminProcedure.input(addProductValidationSchema).mutation(async (cfg) => {
        return await addProduct(cfg)
    }),
    editProduct: adminProcedure.input(editProductValidationSchema).mutation(async (cfg) => {
        return await editProduct(cfg)
    }),
    // delete
    deleteAllProducts: adminProcedure.mutation(async ({ ctx }) => {
        try {
            await ctx.prisma.productFilter.deleteMany()
            await ctx.prisma.productFilterValue.deleteMany()
            await ctx.prisma.productCharacteristic.deleteMany()
            await ctx.prisma.productReview.deleteMany()
            return await ctx.prisma.product.deleteMany()
        } catch (e) {
            console.log(`ERROR! can't delete products!`, e)
            throw e
        }
    }),
})
