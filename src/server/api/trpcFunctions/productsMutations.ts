import { Prisma } from '@prisma/client'
import type { ProductCategory, ProductFilter } from '@prisma/client'
import type {} from '~/modules/shared/lib/validationSchemas'
import { prisma } from '~/server/db'
import type { TRPCContext } from '../apiTypes/sharedTypes'
import type { AddProductInput, EditProductInput } from '~/modules/widgets/ProductForm'

export interface AddProductProps {
    ctx: TRPCContext
    input: AddProductInput
}

export const addProduct = async ({ ctx, input }: AddProductProps) => {
    try {
        const { categories, characteristics, filters, ...rest } = input
        const filtersIds: { id: string }[] | undefined =
            filters && (await createProductFilters(filters)).map(({ id }) => ({ id }))
        return await ctx.prisma.product.create({
            data: {
                ...rest,
                categories: categories && { connect: categories.map((name) => ({ name })) },
                characteristics: {
                    create: characteristics,
                },
                filters: filtersIds && {
                    connect: filtersIds,
                },
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
}

export interface EditProductProps {
    ctx: TRPCContext
    input: EditProductInput
}

export const editProduct = async ({ ctx, input }: EditProductProps) => {
    const { id, categories, characteristics, filters, ...rest } = input
    try {
        // delete old relations
        const productData = await ctx.prisma.product.findFirst({
            where: {
                id,
            },
            select: {
                filters: true,
                categories: true,
            },
        })

        await deleteProductRelations({ productId: id, data: productData })
        // edit product
        const filtersIds: { id: string }[] | undefined =
            filters && (await createProductFilters(filters)).map(({ id }) => ({ id }))
        return await ctx.prisma.product.update({
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
}

// create/edit product helpers

type CreateProductFiltersProps = {
    name: string
    values: string[]
}[]

async function createProductFilters(filters: CreateProductFiltersProps) {
    const promises = [] as Promise<ProductFilter>[]

    filters.forEach(({ name, values }) => {
        try {
            const categoryRes = prisma.productFilter.create({
                data: {
                    name,
                    values: {
                        create: values.map((value) => ({
                            value,
                        })),
                    },
                },
            })
            promises.push(categoryRes)
        } catch (e) {
            console.log("ERROR! can't create categoryFilter!", e)
            throw e
        }
    })

    return await Promise.all(promises)
}

// delete

interface deleteProductRelationsProps {
    productId: string
    data: {
        filters: ProductFilter[]
        categories: ProductCategory[]
    } | null
}

async function deleteProductRelations({ productId, data }: deleteProductRelationsProps) {
    if (!data) return
    const { filters, categories } = data

    for (let index = 0; index < filters.length; index++) {
        const filter = filters[index]
        if (!filter) continue

        await deleteProductFilter({ filterId: filter.id, productId })
    }

    for (let index = 0; index < categories.length; index++) {
        const category = categories[index]
        if (!category) continue

        await disconnectProductFromCategory({ categoryId: category.id, productId })
    }

    await deleteProductCharacteristics(productId)
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

async function deleteProductCharacteristics(productId: string) {
    try {
        await prisma.product.update({
            where: {
                id: productId,
            },
            data: {
                characteristics: {
                    deleteMany: {},
                },
            },
        })
    } catch (e) {
        console.log(`ERROR! can't delete product characteristics!`, e)
        throw e
    }
}
