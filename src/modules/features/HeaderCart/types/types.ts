import type { Product, ProductImagePath, User } from '@prisma/client'

export type ProductWithQuantity = Product & {
    detailPageImages: ProductImagePath[]
    wishedBy: User[]
    quantityInCart: number
}
