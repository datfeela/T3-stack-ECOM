import type { z } from 'zod'
import type { filterNameEnum, sortProductsSchema } from '~/modules/shared/lib/validationSchemas'

export type FilterName = z.infer<typeof filterNameEnum>

export type FilterResponse = {
    id: string
    name: FilterName
    options: { id: string; name: string }[]
}

export type ProductSortBy = z.infer<typeof sortProductsSchema>
