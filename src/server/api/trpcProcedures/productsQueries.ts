import type { ProductSortBy } from '../apiTypes/productsRouterTypes'
import type { TRPCContext } from '../apiTypes/sharedTypes'
import { prisma } from '~/server/db'
import { publicProcedure } from '../trpc'
import { z } from 'zod'
import { sortProductsSchema } from '~/modules/shared/lib/validationSchemas'

export const getProductById = publicProcedure.input(z.string()).query(async ({ input }) => {
    try {
        return await prisma.product.findUnique({
            where: {
                id: input,
            },
            include: {
                categories: true,
                characteristics: true,
                detailPageImages: true,
                filters: {
                    include: {
                        values: true,
                    },
                },
                wishedBy: true,
                originalGame: true,
                relatedGames: true,
                systemRequirementsMinimal: true,
                systemRequirementsRecommended: true,
            },
        })
    } catch (e) {
        console.log(`ERROR! can't get categories!`, e)
        throw e
    }
})

export interface GetManyProductsProps {
    ctx: TRPCContext
    input: {
        quantity: number
        searchQuery?: string
        sortBy?: ProductSortBy
    }
}

export const getManyProducts = publicProcedure
    .input(
        z.object({
            quantity: z.number(),
            searchQuery: z.string().optional(),
            sortBy: sortProductsSchema.optional(),
        }),
    )
    .query(async ({ ctx, input }: GetManyProductsProps) => {
        const { quantity, searchQuery, sortBy } = input
        const query = searchQuery ? searchQuery : ''

        try {
            return await ctx.prisma.product.findMany({
                include: {
                    categories: true,
                },
                take: quantity,
                orderBy: sortBy ? { [sortBy.name]: sortBy.value } : { name: 'asc' },
                where: {
                    OR: [
                        { name: { contains: query } },
                        {
                            categories: {
                                some: {
                                    name: { contains: query },
                                },
                            },
                        },
                    ],
                },
            })
        } catch (e) {
            console.log(`ERROR! can't get categories!`, e)
            throw e
        }
    })

export const getProductReviewsById = publicProcedure
    .input(
        z.object({ id: z.string(), quantity: z.number(), quantityToSkip: z.number().optional() }),
    )
    .query(async ({ input }) => {
        const { id, quantity, quantityToSkip } = input

        try {
            return await prisma.productReview.findMany({
                where: {
                    productId: id,
                },
                include: {
                    User: true,
                },
                take: quantity,
                skip: quantityToSkip || 0,
                orderBy: {
                    date: 'desc',
                },
            })
        } catch (e) {
            console.log(`ERROR! can't get reviews!`, e)
            throw e
        }
    })
