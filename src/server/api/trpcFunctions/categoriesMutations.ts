import { Prisma } from '@prisma/client'
import type { CategoryFilter, ProductCategory } from '@prisma/client'
import { prisma } from '~/server/db'
import { categoriesToInit, filtersToInit } from '~/server/initData/categoriesInitializeData'

export const initializeCategories = async () => {
    // categories
    const categoriesPromises: Promise<ProductCategory>[] = []

    categoriesToInit.forEach((category) => {
        try {
            const res = createCategory(category)
            categoriesPromises.push(res)
        } catch (e) {
            console.log(`ERROR! can't delete products!`, e)
            throw e
        }
    })

    const categories = await Promise.all(categoriesPromises)

    // filters

    const filtersPromises: Promise<CategoryFilter>[] = []

    filtersToInit.forEach(({ name, options }) => {
        const filterPromise = createCategoryFilter({
            name,
            options,
            categoriesIds: categories.map((category) => ({ id: category.id })),
        })
        filtersPromises.push(filterPromise)
    })

    const filters = await Promise.all(filtersPromises)

    return { categories, filters }
}

async function createCategory(name: string) {
    try {
        const categoryRes = await prisma.productCategory.create({
            data: {
                name,
            },
        })

        return categoryRes
    } catch (e) {
        console.log(`ERROR! can't create category!`, e)
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002' && e.meta?.target) {
                throw `ERROR! this category ${e.meta.target} has been already taken!`
            }
        }
        throw e
    }
}

interface CreateCategoryFilterProps {
    categoriesIds: { id: string }[]
    name: string
    options: string[]
}

async function createCategoryFilter({ name, options, categoriesIds }: CreateCategoryFilterProps) {
    try {
        const categoryRes = await prisma.categoryFilter.create({
            data: {
                name,
                options: {
                    create: options.map((option) => ({ name: option })),
                },
                ProductCategories: {
                    connect: categoriesIds,
                },
            },
        })

        return categoryRes
    } catch (e) {
        console.log("ERROR! can't create categoryFilter!", e)
        throw e
    }
}
