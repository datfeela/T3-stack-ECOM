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
        z.object({
            id: z.string(),
            quantity: z.number(),
            // quantityToSkip: z.number().optional(),
            cursor: z.string().nullish(),
        }),
    )
    .query(async ({ input }) => {
        const { id, quantity, cursor } = input

        try {
            const items = await prisma.productReview.findMany({
                where: {
                    productId: id,
                },
                include: {
                    User: true,
                },
                take: quantity + 1,
                // skip: quantityToSkip || 0,
                cursor: cursor ? { id: cursor } : undefined,
                orderBy: {
                    date: 'desc',
                },
            })

            let nextCursor: typeof cursor | undefined = undefined
            if (items.length > quantity) {
                const nextItem = items.pop()
                nextCursor = nextItem!.id
            }
            return {
                items,
                nextCursor,
            }
        } catch (e) {
            console.log(`ERROR! can't get reviews!`, e)
            throw e
        }
    })

export const getProductReviewsStats = publicProcedure
    .input(
        z.object({
            id: z.string(),
        }),
    )
    .query(async ({ input }) => {
        const { id } = input

        try {
            const data = await prisma.product.findUnique({
                where: {
                    id,
                },
                select: {
                    negativeScoresCount: true,
                    positiveScoresCount: true,
                },
            })

            return data
        } catch (e) {
            console.log(`ERROR! can't get reviews!`, e)
            throw e
        }
    })
