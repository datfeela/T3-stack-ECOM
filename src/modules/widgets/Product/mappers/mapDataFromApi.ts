import type { AppRouterOutput } from '~/server/api/root'

import { mapProductFiltersFromApi } from '~/modules/shared/mappers/mapProductFiltersFromApi'
import { mapCategoriesFromApi } from './mapCategoriesFromApi'
import { mapImagesFromApi } from './mapImagesFromApi'
import { parseDateToString } from '~/modules/shared/lib/parseDateToString'
import { Platform } from '../types/types'

export const mapDataFromApi = (
    props: NonNullable<AppRouterOutput['products']['getProductById']>,
) => {
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
