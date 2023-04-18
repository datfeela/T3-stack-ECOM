import { mapProductFiltersFromApi } from '~/modules/shared/mappers/mapProductFiltersFromApi'
import { mapCategoriesFromApi } from './mapCategoriesFromApi'
import { mapImagesFromApi } from './mapImagesFromApi'
import { parseDateToString } from '~/modules/shared/lib/parseDateToString'
import type { Platform } from '../types/types'
import type { ProductPageProps } from '~/modules/entities/product'

export const mapDataFromApi = (props: ProductPageProps) => {
    const { categories, detailPageImages, filters, releaseDate, ...rest } = props

    const categoriesMapped = mapCategoriesFromApi(categories)
    const detailPageImagesMapped = mapImagesFromApi(detailPageImages)
    const { tags, features, platforms, ...restFilters } = mapProductFiltersFromApi(filters)

    const releaseDateParsed = parseDateToString(releaseDate)

    return {
        detailImages: detailPageImagesMapped,
        categories: categoriesMapped,
        properties: {
            releaseDate: releaseDateParsed,
            categories: categoriesMapped,
            platforms: platforms as Platform[],
            ...restFilters,
        },
        tags,
        features,
        releaseDate: releaseDateParsed,
        ...rest,
    }
}
