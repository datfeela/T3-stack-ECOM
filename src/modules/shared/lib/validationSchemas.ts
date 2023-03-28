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
