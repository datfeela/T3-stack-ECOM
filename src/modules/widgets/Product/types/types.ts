import type { Platform, ProductFiltersClient } from '~/modules/shared/types/productTypes'

export interface Properties extends Omit<ProductFiltersClient, 'tags' | 'features'> {
    categories: string[]
    releaseDate: string
    platforms: Platform[] | undefined
}
