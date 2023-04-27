import type { ProductSortBy } from '../apiTypes/productsRouterTypes'
import type { TRPCContext } from '../apiTypes/sharedTypes'
import { prisma } from '~/server/db'
import { publicProcedure } from '../trpc'
import { z } from 'zod'
import { sortProductsSchema } from '~/modules/shared/lib/validationSchemas'
import { Prisma, Product, ProductCategory, ProductImagePath, User } from '@prisma/client'

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

export const getProductMainDataByIdProcedure = publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
        try {
            return await _getProductMainData(input)
        } catch (e) {
            console.log(`ERROR! can't get categories!`, e)
            throw e
        }
    })

export const getManyProducts = publicProcedure
    .input(
        z.object({
            quantity: z.number(),
            searchQuery: z.string().optional(),
            sortBy: sortProductsSchema.optional(),
        }),
    )
    .query(async ({ ctx, input }) => {
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

export const getRecommendedProductsForProduct = publicProcedure
    .input(
        z.object({
            productId: z.string(),
            quantity: z.number(),
        }),
    )
    .query(async ({ ctx, input }) => {
        const { productId, quantity } = input

        try {
            const product = await prisma.product.findUnique({
                where: {
                    id: productId,
                },
                select: {
                    filters: { include: { values: true } },
                    categories: true,
                    negativeScoresCount: true,
                    positiveScoresCount: true,
                    popularity: true,
                },
            })

            if (!product) return

            // map data

            const { categories: categoriesData, filters } = product
            const publisherData = filters.find((el) => el.name === 'publisher')

            const categories = categoriesData.map((el) => el.name)
            const publisher =
                publisherData?.values && publisherData?.values.length > 0
                    ? publisherData.values[0]?.value
                    : undefined

            // get related products
            const publisherRelatedProductsPromise = publisher
                ? prisma.product.findMany({
                      include: {
                          detailPageImages: true,
                      },
                      take: quantity,
                      where: {
                          AND: [
                              {
                                  filters: {
                                      some: {
                                          values: {
                                              some: {
                                                  value: {
                                                      equals: publisher,
                                                  },
                                              },
                                          },
                                      },
                                  },
                              },
                              {
                                  id: {
                                      not: {
                                          equals: productId,
                                      },
                                  },
                              },
                          ],
                      },
                      orderBy: {
                          popularity: 'desc',
                      },
                  })
                : undefined

            const categoriesRelatedProductsPromise = publisher
                ? prisma.product.findMany({
                      include: {
                          detailPageImages: true,
                      },
                      take: quantity,
                      where: {
                          OR: categories.map((catName) => ({
                              categories: {
                                  some: {
                                      name: {
                                          equals: catName,
                                      },
                                  },
                              },
                          })),
                          NOT: {
                              id: {
                                  equals: productId,
                              },
                          },
                      },
                      orderBy: {
                          popularity: 'desc',
                      },
                  })
                : undefined

            const [categoriesRelatedProducts, publisherRelatedProducts] = await Promise.all([
                categoriesRelatedProductsPromise,
                publisherRelatedProductsPromise,
            ])

            // filter duplicates
            const publisherRelatedProductsIds = publisherRelatedProducts?.map(({ id }) => id)

            const categoriesRelatedProductsFiltered = categoriesRelatedProducts?.filter(
                ({ id }) => !publisherRelatedProductsIds?.find((publisherId) => id === publisherId),
            )

            return {
                categoriesRelatedProducts: categoriesRelatedProductsFiltered,
                publisherRelatedProducts,
            }
        } catch (e) {
            console.log(`ERROR! can't get categories!`, e)
            throw e
        }
    })

export const getRelatedProducts = publicProcedure
    .input(
        z.object({
            productId: z.string(),
            originalGameId: z.string().nullable(),
            relatedGamesIds: z.array(z.string()).optional(),
        }),
    )
    .query(async ({ ctx, input }) => {
        const { productId, originalGameId, relatedGamesIds } = input

        try {
            let productsToReturn = [] as (Product & {
                detailPageImages: ProductImagePath[]
            })[]

            if (originalGameId) {
                const originalProduct = await prisma.product.findUnique({
                    where: {
                        id: originalGameId,
                    },
                    include: {
                        detailPageImages: true,
                        relatedGames: {
                            include: {
                                detailPageImages: true,
                            },
                        },
                    },
                })

                if (originalProduct) {
                    const { relatedGames, ...rest } = originalProduct

                    productsToReturn.push({ ...rest })
                    productsToReturn.push(...relatedGames.filter((el) => el.id !== productId))
                }
            }

            if (relatedGamesIds) {
                const productsPromises = [] as Prisma.Prisma__ProductClient<Product | null, null>[]

                relatedGamesIds.forEach((id) => {
                    const productPromise = prisma.product.findUnique({
                        where: {
                            id,
                        },
                        include: {
                            detailPageImages: true,
                        },
                    })

                    productsPromises.push(productPromise)
                })

                const products = (await Promise.all(productsPromises)).filter(
                    (el) => el !== null,
                ) as (Product & {
                    detailPageImages: ProductImagePath[]
                })[]

                productsToReturn.push(...products)
            }

            return productsToReturn
        } catch (e) {
            console.log(`ERROR! can't get categories!`, e)
            throw e
        }
    })

export const getManyProductsByIds = publicProcedure
    .input(z.array(z.string()))
    .query(async ({ input: productsIds }) => {
        const productsPromises = [] as Promise<
            | (Product & {
                  detailPageImages: ProductImagePath[]
                  wishedBy: User[]
              })
            | null
        >[]

        try {
            productsIds.forEach((id) => {
                const promise = _getProductMainData(id)
                productsPromises.push(promise)
            })

            const products = await Promise.all(productsPromises)
            const productsFiltered = products.filter((product) => !!product) as (Product & {
                detailPageImages: ProductImagePath[]
                wishedBy: User[]
            })[]

            return productsFiltered
        } catch (e) {
            console.log(`ERROR! can't get categories!`, e)
            throw e
        }
    })

export const getMainPageProducts = publicProcedure.query(async () => {
    return getMainPageProducts_server()
})
// reviews

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

// helpers

async function _getProductMainData(productId: string) {
    return await prisma.product.findUnique({
        where: {
            id: productId,
        },
        include: {
            detailPageImages: true,
            wishedBy: true,
        },
    })
}

export async function getMainPageProducts_server() {
    const products = await prisma.mainPageProduct.findMany({
        take: 10,
        orderBy: {
            sortNum: 'asc',
        },
        include: {
            product: {
                include: {
                    detailPageImages: true,
                },
            },
        },
    })

    return products
}
