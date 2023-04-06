import type { ProductCategory } from '@prisma/client'

export const mapCategoriesFromApi = (categories: ProductCategory[]) => {
    return categories.map((category) => category.name)
}
