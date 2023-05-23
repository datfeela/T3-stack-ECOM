import { Prisma } from '@prisma/client'
import { prisma } from '~/server/db'
import { publicProcedure } from '../trpc'
import { z } from 'zod'
import type { OrderStatus } from '~/modules/shared/types/orderTypes'
import { orderStatusEnum } from '~/modules/shared/lib/validationSchemas'
import { changeProductPopularity } from './productsMutations'

export const createOrder = publicProcedure
    .input(
        z.object({
            totalPrice: z.number(),
            totalPriceWithoutDiscount: z.number().nullish(),
            deliveryEmail: z.string(),
            products: z.array(z.object({ id: z.string(), quantity: z.number() })),
        }),
    )
    .mutation(async ({ input, ctx }) => {
        const { session } = ctx
        const orderStatus: OrderStatus = 'paidFor'
        const { deliveryEmail, products, totalPrice, totalPriceWithoutDiscount } = input

        try {
            const order = await prisma.order.create({
                data: {
                    totalPrice,
                    totalPriceWithoutDiscount,
                    deliveryEmail,
                    status: orderStatus,
                    User: session?.user
                        ? {
                              connect: {
                                  id: session.user.id,
                              },
                          }
                        : undefined,
                },
            })

            // update products popularity
            const popularityPromises: Promise<void>[] = []

            products.forEach((product) => {
                const promise = changeProductPopularity({
                    productId: product.id,
                    amountToChange: 5 * product.quantity,
                })

                popularityPromises.push(promise)
            })
            //

            await Promise.all([
                ...popularityPromises,
                createOrderProducts({ products, orderId: order.id }),
            ])

            return order
        } catch (e) {
            console.log(`ERROR! createOrder:`, JSON.stringify(e))
            throw e
        }
    })

export const updateOrderStatus = publicProcedure
    .input(z.object({ newStatus: orderStatusEnum, id: z.string() }))
    .mutation(async ({ input }) => {
        const { id, newStatus } = input

        try {
            const res = await prisma.order.update({
                where: { id },
                data: {
                    status: newStatus,
                },
            })

            return res
        } catch (e) {
            console.log(`ERROR! updateOrderStatus:`, JSON.stringify(e))
            throw e
        }
    })

// functions

interface CreateOrderProductsProps {
    products: {
        id: string
        quantity: number
    }[]
    orderId: string
}

async function createOrderProducts({ products, orderId }: CreateOrderProductsProps) {
    const productsData = await prisma.product.findMany({
        where: {
            OR: products.map(({ id }) => ({
                id,
            })),
        },
        select: {
            id: true,
            name: true,
            verticalImagePath: true,
            price: true,
            priceWithoutDiscount: true,
        },
    })

    const productDataMapped = productsData.map(({ id, verticalImagePath, ...rest }) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const quantity = products.find(
            (productWithQuantity) => productWithQuantity.id === id,
        )!.quantity

        return {
            productId: id,
            quantity,
            imagePath: verticalImagePath,
            ...rest,
            orderId,
        }
    })

    return await prisma.orderProduct.createMany({
        data: productDataMapped,
    })
}
