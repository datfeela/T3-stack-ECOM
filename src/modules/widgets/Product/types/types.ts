import type { ProductFiltersClient } from '~/modules/shared/types/productTypes'

export type Platform = 'ps' | 'xbox' | 'windows'

export interface Properties extends Omit<ProductFiltersClient, 'tags' | 'features'> {
    categories: string[]
    releaseDate: string
    platforms: Platform[] | undefined
}
