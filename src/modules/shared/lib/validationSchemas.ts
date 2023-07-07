import { z } from 'zod'

// product

export const filterNameEnum = z.nativeEnum({
    gamemodes: 'gamemodes',
    tags: 'tags',
    platforms: 'platforms',
    publisher: 'publisher',
    features: 'features',
    developer: 'developer',
} as const)

export const filtersSchema = z.array(
    z.object({
        name: filterNameEnum,
        values: z.array(z.string()),
    }),
)

export const clientFiltersSchema = z.object({
    gamemodes: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    platforms: z.array(z.string()).optional(),
    publisher: z.array(z.string()).optional(),
    developer: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
})

export const productType = z.enum(['game', 'DLC', 'edition'])

// product sort

export const NamesToSortProductsEnum = z.nativeEnum({
    price: 'price',
    name: 'name',
    popularity: 'popularity',
    releaseDate: 'releaseDate',
} as const)

export const ValuesToSortProductsEnum = z.nativeEnum({
    asc: 'asc',
    desc: 'desc',
} as const)

export const sortProductsSchema = z.object({
    name: NamesToSortProductsEnum,
    value: ValuesToSortProductsEnum,
})

// addReview

export const addReviewValidationSchema = z.object({
    productId: z.string(),
    rating: z.number().min(0).max(1),
    message: z
        .string()
        .max(1500, { message: 'Message must be 1500 or fewer characters long' })
        .optional(),
})

export const getManyProductsFiltersSchema = z.object({
    categories: z.array(z.string()).optional(),
    filters: filtersSchema.optional(),
    priceMin: z.number().optional(),
    priceMax: z.number().optional(),
    releaseDateStart: z.date().optional(),
    releaseDateEnd: z.date().optional(),
    productType: z.array(productType).optional(),
    isWithDiscount: z.boolean().optional(),
})

export const getManyProductsInputSchema = z.object({
    quantity: z.number(),
    searchQuery: z.string().optional(),
    isAdvancedSearch: z.boolean().optional(),
    sortBy: sortProductsSchema.optional(),
    comingSoon: z.boolean().optional(),
    onSale: z.boolean().optional(),
    cursor: z.string().nullish(),
    sortFilters: getManyProductsFiltersSchema.optional(),
})

// order

export const orderStatusEnum = z.nativeEnum({
    canceled: 'canceled',
    received: 'received',
    paidFor: 'paidFor',
} as const)
