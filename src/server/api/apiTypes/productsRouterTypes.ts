import type { z } from 'zod'
import type {
    NamesToSortProductsEnum,
    sortProductsSchema,
} from '~/modules/shared/lib/validationSchemas'
import type { FilterName } from '~/modules/shared/types/productTypes'

export type FilterResponse = {
    id: string
    name: FilterName
    options: { id: string; name: string }[]
}

export type ProductSortByName = z.infer<typeof NamesToSortProductsEnum>
export type ProductSortBy = z.infer<typeof sortProductsSchema>
