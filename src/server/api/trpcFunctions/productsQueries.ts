import type { ProductSortBy } from '../apiTypes/productsRouterTypes'
import type { TRPCContext } from '../apiTypes/sharedTypes'
import { prisma } from '~/server/db'
import { publicProcedure } from '../trpc'
import { z } from 'zod'

export const getProductById = publicProcedure.input(z.string()).query(async ({ input }) => {
    try {
        return await prisma.product.findUnique({
            where: {
                id: input,
            },
            include: {
                categories: true,
                characteristics: true,
                filters: {
                    include: {
                        values: true,
                    },
                },
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

export const getManyProducts = async ({ ctx, input }: GetManyProductsProps) => {
    const { quantity, searchQuery, sortBy } = input
    const query = searchQuery ? searchQuery : ''

    try {
        return await ctx.prisma.product.findMany({
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
}
