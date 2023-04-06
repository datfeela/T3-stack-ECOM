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

// product sort

export const NamesToSortProductsEnum = z.nativeEnum({
    price: 'price',
    name: 'name',
} as const)

export const ValuesToSortProductsEnum = z.nativeEnum({
    asc: 'asc',
    desc: 'desc',
} as const)

export const sortProductsSchema = z.object({
    name: NamesToSortProductsEnum,
    value: ValuesToSortProductsEnum,
})
