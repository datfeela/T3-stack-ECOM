import { MainPageProduct, Prisma } from '@prisma/client'
import type { ProductCategory, ProductFilter } from '@prisma/client'
import { prisma } from '~/server/db'
import {
    addProductValidationSchema,
    editProductValidationSchema,
} from '~/modules/widgets/ProductForm'
import { adminProcedure, protectedProcedure, publicProcedure } from '../trpc'
import { z } from 'zod'
import { addReviewValidationSchema } from '../../../modules/shared/lib/validationSchemas'
import { OrderStatus } from '~/modules/shared/types/orderTypes'
import { getManyProductsByIds } from './productsQueries'

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

            const orderProducts = await createOrderProducts({ products, orderId: order.id })

            // return await prisma.product.create({
            //     data: {
            //         ...rest,
            //         categories: categories && { connect: categories.map((name) => ({ name })) },
            //         characteristics: {
            //             create: characteristics,
            //         },
            //         filters: filtersIds && {
            //             connect: filtersIds,
            //         },
            //         detailPageImages: {
            //             create: detailPageImages,
            //         },
            //         originalGame: originalGameId
            //             ? {
            //                   connect: {
            //                       id: originalGameId,
            //                   },
            //               }
            //             : undefined,
            //         systemRequirementsMinimal: {
            //             create: systemRequirementsMinimal,
            //         },
            //         systemRequirementsRecommended: {
            //             create: systemRequirementsRecommended,
            //         },
            //     },
            // })
        } catch (e) {
            console.log(`ERROR! can't create new product!`, e)
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002' && e.meta?.target) {
                    throw `this ${e.meta.target} has been already taken!`
                }
            }
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
