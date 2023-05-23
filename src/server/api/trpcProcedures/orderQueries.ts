import { prisma } from '~/server/db'
import { adminProcedure, protectedProcedure } from '../trpc'
import { z } from 'zod'
import { orderStatusEnum } from '~/modules/shared/lib/validationSchemas'

export const getUserOrders = protectedProcedure
    .input(
        z.object({
            quantity: z.number(),
            cursor: z.string().nullish(),
        }),
    )
    .query(async ({ ctx, input }) => {
        const { quantity, cursor } = input
        const { session } = ctx

        try {
            const orders = await prisma.order.findMany({
                include: {
                    products: true,
                },
                take: quantity + 1,
                orderBy: { date: 'desc' },
                where: {
                    userId: session.user.id,
                },
                cursor: cursor ? { id: cursor } : undefined,
            })

            let nextCursor: typeof cursor | undefined = undefined
            if (orders.length > quantity) {
                const nextItem = orders.pop()
                nextCursor = nextItem!.id
            }
            return {
                orders,
                nextCursor,
            }
        } catch (e) {
            console.log(`ERROR! getOrdersByUserId: `, JSON.stringify(e))
            throw e
        }
    })

export const getOrderByIdAdmin = adminProcedure.input(z.string()).query(async ({ input }) => {
    try {
        const order = await prisma.order.findUnique({
            where: { id: input },
            include: {
                products: true,
                User: true,
            },
        })

        return order
    } catch (e) {
        console.log(`getOrderByIdAdmin`, JSON.stringify(e))
        throw e
    }
})

export const getManyOrdersAdmin = adminProcedure
    .input(
        z.object({
            quantity: z.number(),
            cursor: z.string().nullish(),
            status: z.array(orderStatusEnum).optional(),
            searchQuery: z.string().optional(),
        }),
    )
    .query(async ({ input }) => {
        const { quantity, status, searchQuery, cursor } = input

        try {
            const orders = await prisma.order.findMany({
                include: {
                    products: true,
                },
                take: quantity + 1,
                orderBy: { date: 'desc' },
                cursor: cursor ? { id: cursor } : undefined,
                where: {
                    AND: [
                        {
                            OR: searchQuery
                                ? [
                                      {
                                          deliveryEmail: {
                                              contains: searchQuery,
                                              mode: 'insensitive',
                                          },
                                      },
                                      {
                                          User: {
                                              email: { contains: searchQuery, mode: 'insensitive' },
                                          },
                                      },
                                      {
                                          User: {
                                              name: { contains: searchQuery, mode: 'insensitive' },
                                          },
                                      },
                                      { id: { contains: searchQuery, mode: 'insensitive' } },
                                  ]
                                : undefined,
                        },
                        {
                            OR:
                                !!status && status.length > 0
                                    ? status.map((value) => ({
                                          status: {
                                              equals: value,
                                          },
                                      }))
                                    : undefined,
                        },
                    ],
                },
            })

            let nextCursor: typeof cursor | undefined = undefined
            if (orders.length > quantity) {
                const nextItem = orders.pop()
                nextCursor = nextItem!.id
            }
            return {
                orders,
                nextCursor,
            }
        } catch (e) {
            console.log(`ERROR! getOrdersByUserId: `, JSON.stringify(e))
            throw e
        }
    })
