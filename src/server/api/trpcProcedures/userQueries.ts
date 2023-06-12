import { z } from 'zod'
import { prisma } from '~/server/db'
import { protectedProcedure } from '../trpc'

export const getUserWishes = protectedProcedure
    .input(
        z.object({
            userId: z.string(),
            quantity: z.number(),
            cursor: z.string().nullish(),
        }),
    )
    .query(async ({ input }) => {
        const { quantity, userId, cursor } = input

        try {
            const res = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    wishedProducts: {
                        take: quantity + 1,
                        cursor: cursor ? { id: cursor } : undefined,
                        orderBy: [
                            {
                                popularity: 'desc',
                            },
                            {
                                name: 'asc',
                            },
                        ],
                    },
                },
            })

            let nextCursor: typeof cursor | undefined = undefined
            if (res?.wishedProducts && res.wishedProducts.length > quantity) {
                const nextItem = res.wishedProducts.pop()
                nextCursor = nextItem!.id
            }
            return {
                products: res?.wishedProducts,
                nextCursor,
            }
        } catch (e) {
            console.log(`ERROR! can't get categories!`, e)
            throw e
        }
    })
