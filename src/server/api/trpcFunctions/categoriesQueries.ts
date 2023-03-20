import { prisma } from '~/server/db'

export const getCategoryFilters = async () => {
    try {
        return await prisma.categoryFilter.findMany({
            include: { options: true },
        })
    } catch (e) {
        console.log(`ERROR! can't get filters!`, e)
        throw e
    }
}

export const getAllCategories = async () => {
    try {
        return await prisma.productCategory.findMany()
    } catch (e) {
        console.log(`ERROR! can't get categories!`, e)
        throw e
    }
}
