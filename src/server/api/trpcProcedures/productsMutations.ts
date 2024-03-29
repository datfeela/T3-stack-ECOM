import { Prisma } from '@prisma/client'
import type { ProductCategory, ProductFilter } from '@prisma/client'
import { prisma } from '~/server/db'
import {
    addProductValidationSchema,
    editProductValidationSchema,
} from '~/modules/widgets/ProductForm'
import { adminProcedure, protectedProcedure } from '../trpc'
import { z } from 'zod'
import { addReviewValidationSchema } from '../../../modules/shared/lib/validationSchemas'

export const addProduct = adminProcedure
    .input(addProductValidationSchema)
    .mutation(async ({ input }) => {
        try {
            const {
                categories,
                characteristics,
                filters,
                detailPageImages,
                originalGameId,
                systemRequirementsMinimal,
                systemRequirementsRecommended,
                ...rest
            } = input
            const filtersIds: { id: string }[] | undefined =
                filters && (await createProductFilters(filters)).map(({ id }) => ({ id }))

            return await prisma.product.create({
                data: {
                    ...rest,
                    categories: categories && { connect: categories.map((name) => ({ name })) },
                    characteristics: {
                        create: characteristics,
                    },
                    filters: filtersIds && {
                        connect: filtersIds,
                    },
                    detailPageImages: {
                        create: detailPageImages,
                    },
                    originalGame: originalGameId
                        ? {
                              connect: {
                                  id: originalGameId,
                              },
                          }
                        : undefined,
                    systemRequirementsMinimal: systemRequirementsMinimal
                        ? {
                              create: systemRequirementsMinimal,
                          }
                        : undefined,
                    systemRequirementsRecommended: systemRequirementsRecommended
                        ? {
                              create: systemRequirementsRecommended,
                          }
                        : undefined,
                },
            })
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

export const editProduct = adminProcedure
    .input(editProductValidationSchema)
    .mutation(async ({ input }) => {
        const {
            id,
            categories,
            characteristics,
            filters,
            detailPageImages,
            systemRequirementsMinimal,
            systemRequirementsRecommended,
            originalGameId,
            ...rest
        } = input
        try {
            // delete old relations
            const productData = await prisma.product.findFirst({
                where: {
                    id,
                },
                select: {
                    filters: true,
                    categories: true,
                    originalGameId: true,
                },
            })

            await deleteProductRelations({ productId: id, data: productData })
            // edit product
            const filtersIds: { id: string }[] | undefined =
                filters && (await createProductFilters(filters)).map(({ id }) => ({ id }))
            return await prisma.product.update({
                where: {
                    id,
                },
                data: {
                    ...rest,
                    categories: categories && { connect: categories.map((name) => ({ name })) },
                    characteristics: {
                        create: characteristics,
                    },
                    filters: filtersIds && {
                        connect: filtersIds,
                    },
                    detailPageImages: {
                        create: detailPageImages,
                    },
                    originalGame: originalGameId
                        ? {
                              connect: {
                                  id: originalGameId,
                              },
                          }
                        : undefined,
                    systemRequirementsMinimal: systemRequirementsMinimal
                        ? {
                              create: systemRequirementsMinimal,
                          }
                        : undefined,
                    systemRequirementsRecommended: systemRequirementsRecommended
                        ? {
                              create: systemRequirementsRecommended,
                          }
                        : undefined,
                },
            })
        } catch (e) {
            console.log(`ERROR! can't update product!`, e)
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002' && e.meta?.target) {
                    throw `this ${e.meta.target} has been already taken!`
                }
            }
            throw e
        }
    })

export const deleteProduct = adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
        const { id } = input
        try {
            // delete old relations
            const productData = await prisma.product.findFirst({
                where: {
                    id,
                },
                select: {
                    filters: true,
                    categories: true,
                    originalGameId: true,
                },
            })

            await deleteProductRelations({ productId: id, data: productData })
            // delete product
            await prisma.product.delete({
                where: {
                    id,
                },
            })
        } catch (e) {
            console.log(`ERROR! deleteProduct:`, JSON.stringify(e))
            throw e
        }
    })

export const toggleProductToWishes = protectedProcedure
    .input(z.object({ productId: z.string(), action: z.enum(['add', 'delete']) }))
    .mutation(async ({ ctx, input }) => {
        try {
            const { productId, action } = input
            const userId = ctx.session?.user.id

            // increment popularity by 1 for adding to wishes, decrement by 1 for deleting
            await changeProductPopularity({
                amountToChange: action === 'add' ? 1 : -1,
                productId,
            })

            const procedure =
                action === 'add'
                    ? {
                          connect: {
                              id: userId,
                          },
                      }
                    : {
                          disconnect: {
                              id: userId,
                          },
                      }

            return await prisma.product.update({
                where: {
                    id: productId,
                },
                data: {
                    wishedBy: procedure,
                },
            })
        } catch (e) {
            console.log(`ERROR! can't add to wishes!`, e)
            throw e
        }
    })

export const addReviewToProduct = protectedProcedure
    .input(addReviewValidationSchema)
    .mutation(async ({ ctx, input }) => {
        const { productId, rating, message } = input
        const userId = ctx.session.user.id

        return await prisma.product.update({
            where: {
                id: productId,
            },
            data: {
                reviews: {
                    create: {
                        userId,
                        rating,
                        message,
                    },
                },
                positiveScoresCount: {
                    increment: rating,
                },
                negativeScoresCount: {
                    increment: rating === 0 ? 1 : 0,
                },
            },
        })
    })

export const updateMainPageProducts = adminProcedure
    .input(z.array(z.object({ id: z.string(), sortNum: z.number() })))
    .mutation(async ({ input: products }) => {
        try {
            await prisma.mainPageProduct.deleteMany()

            return await prisma.mainPageProduct.createMany({
                data: products.map(({ id, sortNum }) => ({
                    sortNum,
                    productId: id,
                })),
            })
        } catch (e) {
            console.log(`ERROR! can't update mainPageProducts!`, e)
            throw e
        }
    })

export const deleteAllProducts = adminProcedure.mutation(async () => {
    try {
        await prisma.productFilter.deleteMany()
        await prisma.productFilterValue.deleteMany()
        await prisma.productCharacteristic.deleteMany()
        await prisma.productReview.deleteMany()
        return await prisma.product.deleteMany()
    } catch (e) {
        console.log(`ERROR! can't delete products!`, e)
        throw e
    }
})

// create/edit product helpers

type CreateProductFiltersProps = {
    name: string
    values: string[]
}[]

async function createProductFilters(filters: CreateProductFiltersProps) {
    const productFilterPromises = [] as Promise<ProductFilter>[]

    filters.forEach(({ name, values }) => {
        try {
            const productFilterRes = prisma.productFilter.create({
                data: {
                    name,
                    values: {
                        create: values.map((value) => ({
                            value,
                        })),
                    },
                },
            })
            productFilterPromises.push(productFilterRes)

            // update categories
            updateGlobalFilters({ name, valuesToCheck: values })
        } catch (e) {
            console.log("ERROR! can't create productFilter!", e)
            throw e
        }
    })

    return await Promise.all(productFilterPromises)
}

interface UpdateGlobalFiltersProps {
    name: string
    valuesToCheck: string[]
}

async function updateGlobalFilters({ name, valuesToCheck }: UpdateGlobalFiltersProps) {
    try {
        const categoryFilters = await prisma.categoryFilter.findFirst({
            where: { name },
            include: {
                options: true,
            },
        })

        const valuesToAppend: string[] = []

        const valuesFiltered = Array.from(new Set(valuesToCheck))

        valuesFiltered.forEach((value) => {
            if (!categoryFilters?.options.find(({ name }) => name === value))
                valuesToAppend.push(value)
        })

        if (valuesToAppend.length > 0) {
            await prisma.categoryFilter.update({
                where: { name },
                data: {
                    options: {
                        createMany: {
                            data: valuesToAppend.map((option) => ({ name: option })),
                        },
                    },
                },
            })
        }
    } catch (e) {
        console.log("ERROR! updateGlobalFilters: can't update filters!", e)
        throw e
    }
}

interface changeProductPopularityProps {
    productId: string
    amountToChange: number
}

export async function changeProductPopularity({
    productId,
    amountToChange,
}: changeProductPopularityProps) {
    const procedure =
        amountToChange > 0 ? { increment: amountToChange } : { decrement: Math.abs(amountToChange) }

    try {
        await prisma.product.update({
            where: {
                id: productId,
            },
            data: {
                popularity: procedure,
            },
        })
    } catch (e) {
        console.log(`ERROR! can't change ProductPopularity!`, e)
        throw e
    }
}

// delete product relations helpers

interface deleteProductRelationsProps {
    productId: string
    data: {
        filters: ProductFilter[]
        categories: ProductCategory[]
        originalGameId: string | null
    } | null
}

async function deleteProductRelations({ productId, data }: deleteProductRelationsProps) {
    if (!data) return
    const { filters, categories, originalGameId } = data

    for (let index = 0; index < filters.length; index++) {
        const filter = filters[index]
        if (!filter) continue

        await deleteProductFilter({ filterId: filter.id, productId })
    }

    await prisma.product.update({
        where: {
            id: productId,
        },
        data: {
            filters: {
                deleteMany: {},
            },
            characteristics: {
                deleteMany: {},
            },
            detailPageImages: {
                deleteMany: {},
            },
            originalGame: originalGameId
                ? {
                      disconnect: true,
                  }
                : undefined,
            systemRequirementsMinimal: {
                delete: true,
            },
            systemRequirementsRecommended: {
                delete: true,
            },
        },
    })

    for (let index = 0; index < categories.length; index++) {
        const category = categories[index]
        if (!category) continue

        await disconnectProductFromCategory({ categoryId: category.id, productId })
    }
}

interface DeleteProductFilterProps {
    productId: string
    filterId: string
}

async function deleteProductFilter({ productId, filterId }: DeleteProductFilterProps) {
    try {
        await prisma.product.update({
            where: {
                id: productId,
            },
            data: {
                filters: {
                    update: {
                        where: {
                            id: filterId,
                        },
                        data: {
                            values: {
                                deleteMany: {},
                            },
                        },
                    },
                },
            },
        })
    } catch (e) {
        console.log(`ERROR! can't delete product filter values!`, e)
        throw e
    }

    try {
        await prisma.product.update({
            where: {
                id: productId,
            },
            data: {
                filters: {
                    delete: {
                        id: filterId,
                    },
                },
            },
        })
    } catch (e) {
        console.log(`ERROR! can't delete product filter!`, e)
        throw e
    }
}

interface DisconnectProductFromCategoryProps {
    productId: string
    categoryId: string
}

async function disconnectProductFromCategory({
    productId,
    categoryId,
}: DisconnectProductFromCategoryProps) {
    try {
        await prisma.productCategory.update({
            where: {
                id: categoryId,
            },
            data: {
                products: {
                    disconnect: {
                        id: productId,
                    },
                },
            },
        })
    } catch (e) {
        console.log(`ERROR! can't disconnect product from category!`, e)
        throw e
    }
}
