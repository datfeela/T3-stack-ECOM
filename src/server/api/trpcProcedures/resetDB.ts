import { prisma } from '~/server/db'
import { adminProcedure } from '../trpc'

export const resetDB = adminProcedure.mutation(async () => {
    const productsPromise = await prisma.product.deleteMany()
    const categoriesPromise = await prisma.productCategory.deleteMany({ where: {} })
    const categoryFiltersPromise = await prisma.categoryFilter.deleteMany()
    const categoryFilterOptions = await prisma.categoryFilterOption.deleteMany()
    const productChars = await prisma.productCharacteristic.deleteMany()
    const productCategories = await prisma.productCategory.deleteMany()
    const productFilters = await prisma.productFilter.deleteMany()
    const productFilterValues = await prisma.productFilterValue.deleteMany()
    const productImagePaths = await prisma.productImagePath.deleteMany()
    const productReviews = await prisma.productReview.deleteMany()
    const productSystemRequirements = await prisma.productSystemRequirements.deleteMany()

    return [
        productsPromise,
        categoriesPromise,
        categoryFiltersPromise,
        categoryFilterOptions,
        productChars,
        productCategories,
        productFilters,
        productFilterValues,
        productImagePaths,
        productReviews,
        productSystemRequirements,
    ]
})
