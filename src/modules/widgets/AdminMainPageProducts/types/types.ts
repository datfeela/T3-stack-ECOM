import type { Product, ProductImagePath, User } from '@prisma/client'

export type SelectedProduct = Product & {
    detailPageImages: ProductImagePath[]
    wishedBy: User[]
    sortNum: number
}
