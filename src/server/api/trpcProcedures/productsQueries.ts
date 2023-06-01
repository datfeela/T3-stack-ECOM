import { prisma } from '~/server/db'
import { publicProcedure } from '../trpc'
import { z } from 'zod'
import { getManyProductsInputSchema } from '~/modules/shared/lib/validationSchemas'
import type { Prisma, Product, ProductImagePath, User } from '@prisma/client'
import type { GetManyProductsInput } from '~/modules/shared/types/productTypes'

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
        console.log(`ERROR! getProductById: `, JSON.stringify(e))
        throw e
    }
})

export const getProductMainDataByIdProcedure = publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
        try {
            return await _getProductMainData(input)
        } catch (e) {
            console.log(`ERROR! getProductMainDataById:`, JSON.stringify(e))
            throw e
        }
    })

export const getManyProducts = publicProcedure
    .input(getManyProductsInputSchema)
    .query(async ({ input }) => {
        const { quantity, searchQuery, isAdvancedSearch, sortBy, comingSoon, onSale, cursor } =
            input
        const query = searchQuery ? searchQuery : ''

        try {
            return await getManyProducts_server({
                quantity,
                sortBy,
                searchQuery: query,
                isAdvancedSearch,
                comingSoon,
                onSale,
                cursor,
            })
        } catch (e) {
            console.log(`ERROR! getManyProducts`, JSON.stringify(e))
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
    .query(async ({ input }) => {
        const { productId, quantity } = input

        try {
            const productData = await getProductDataForRecommendations(productId)
            if (!productData) return

            const { publisher, categories } = productData

            // get related products
            const publisherRelatedProductsPromise = getPublisherRelatedProducts({
                productId,
                quantity,
                publisher,
            })

            const categoriesRelatedProductsPromise = getCategoriesRelatedProducts({
                productId,
                quantity,
                categories,
            })

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
            console.log(`ERROR! getRecommendedProductsForProduct:`, JSON.stringify(e))
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
    .query(async ({ input }) => {
        const { productId, originalGameId, relatedGamesIds } = input

        try {
            const productsToReturn = [] as (Product & {
                detailPageImages: ProductImagePath[]
            })[]

            if (originalGameId) {
                const productsData = await getRelatedProductsDataByOriginalProductId({
                    productId,
                    originalGameId,
                })

                if (productsData) productsToReturn.push(...productsData)
            }

            if (relatedGamesIds) {
                const products = await getRelatedProductsDataByRelatedGamesIds({ relatedGamesIds })

                productsToReturn.push(...products)
            }

            return productsToReturn
        } catch (e) {
            console.log(`ERROR! getRelatedProducts:`, JSON.stringify(e))
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
            console.log(`ERROR! getManyProductsByIds:`, JSON.stringify(e))
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
            console.log(`ERROR! getProductReviewsById:`, JSON.stringify(e))
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
            console.log(`ERROR! getProductReviewsStats:`, JSON.stringify(e))
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

export async function getManyProducts_server({
    quantity,
    searchQuery = '',
    isAdvancedSearch,
    sortBy,
    comingSoon,
    onSale,
    cursor,
}: GetManyProductsInput) {
    const releaseDateCondition = {
        releaseDate: comingSoon
            ? {
                  gte: new Date(),
              }
            : undefined,
    }

    const onSaleCondition = {
        priceWithoutDiscount: onSale
            ? {
                  gt: 0,
              }
            : undefined,
    }

    const nameConditions = searchQuery
        .split(' ')
        .map((word) => ({ name: { contains: word, mode: 'insensitive' as const } }))

    const categoriesConditions = searchQuery.split(' ').map((word) => ({
        categories: {
            some: { name: { contains: word, mode: 'insensitive' as const } },
        },
    }))

    try {
        const products = await prisma.product.findMany({
            include: {
                categories: true,
            },
            take: quantity + 1,
            orderBy: sortBy ? { [sortBy.name]: sortBy.value } : { name: 'asc' },
            where: {
                AND: [
                    releaseDateCondition,
                    onSaleCondition,
                    isAdvancedSearch
                        ? { OR: [{ AND: nameConditions }, { AND: categoriesConditions }] }
                        : { AND: nameConditions },
                ],
            },
            cursor: cursor ? { id: cursor } : undefined,
        })

        let nextCursor: typeof cursor | undefined = undefined
        if (products.length > quantity) {
            const nextItem = products.pop()
            nextCursor = nextItem!.id
        }
        return {
            products,
            nextCursor,
        }
    } catch (e) {
        console.log(`ERROR! getManyProducts:`, JSON.stringify(e))
        throw e
    }
}

export async function getMainPageProducts_server() {
    try {
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
    } catch (e) {
        console.log(`ERROR! getMainPageProducts:`, JSON.stringify(e))
        throw e
    }
}

async function getProductDataForRecommendations(productId: string) {
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

    return { publisher, categories }
}

interface GetPublisherRelatedProductsProps {
    productId: string
    quantity: number
    publisher?: string
}

function getPublisherRelatedProducts({
    productId,
    quantity,
    publisher,
}: GetPublisherRelatedProductsProps) {
    const promise = publisher
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
                                              mode: 'insensitive',
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

    return promise
}

interface GetCategoriesRelatedProductsProps {
    productId: string
    quantity: number
    categories: string[]
}

function getCategoriesRelatedProducts({
    productId,
    quantity,
    categories,
}: GetCategoriesRelatedProductsProps) {
    const promise = prisma.product.findMany({
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
                            mode: 'insensitive',
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

    return promise
}

interface GetRelatedProductsDataByOriginalProductIdProps {
    originalGameId: string
    productId: string
}

async function getRelatedProductsDataByOriginalProductId({
    productId,
    originalGameId,
}: GetRelatedProductsDataByOriginalProductIdProps) {
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

        return [{ ...rest }, ...relatedGames.filter((el) => el.id !== productId)]
    }
}

interface GetRelatedProductsDataByRelatedGamesIdsProps {
    relatedGamesIds: string[]
}

async function getRelatedProductsDataByRelatedGamesIds({
    relatedGamesIds,
}: GetRelatedProductsDataByRelatedGamesIdsProps) {
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

    return products
}
