import type { AppRouterOutput } from '~/server/api/root'

import { mapProductFiltersFromApi } from '~/modules/shared/mappers/mapProductFiltersFromApi'
import { mapCategoriesFromApi } from './mapCategoriesFromApi'
import { mapImagesFromApi } from './mapImagesFromApi'
import { parseDateToString } from '~/modules/shared/lib/parseDateToString'

export const mapDataFromApi = (
    props: NonNullable<AppRouterOutput['products']['getProductById']>,
) => {
    const { categories, detailPageImages, filters, releaseDate, ...rest } = props

    const categoriesMapped = mapCategoriesFromApi(categories)
    const detailPageImagesMapped = mapImagesFromApi(detailPageImages)
    const { tags, features, ...restFilters } = mapProductFiltersFromApi(filters)

    const releaseDateParsed = parseDateToString(releaseDate)

    return {
        detailImages: detailPageImagesMapped,
        categories: categoriesMapped,
        properties: {
            releaseDate: releaseDateParsed,
            categories: categoriesMapped,
            ...restFilters,
        },
        tags,
        features,
        releaseDate: releaseDateParsed,
        ...rest,
    }
}
