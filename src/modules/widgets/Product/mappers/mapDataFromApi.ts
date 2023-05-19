import { mapProductFiltersFromApi } from '~/modules/shared/mappers/mapProductFiltersFromApi'
import { mapCategoriesFromApi } from './mapCategoriesFromApi'
import { mapImagesFromApi } from './mapImagesFromApi'
import { parseDateToString } from '~/modules/shared/lib/parseDateToString'
import type { ProductPageProps } from '~/modules/entities/product'
import type { Platform } from '~/modules/shared/types/productTypes'

export const mapDataFromApi = (props: ProductPageProps) => {
    const { categories, detailPageImages, filters, releaseDate, relatedGames, ...rest } = props

    const categoriesMapped = mapCategoriesFromApi(categories)
    const detailPageImagesMapped = mapImagesFromApi(detailPageImages)
    const { tags, features, platforms, ...restFilters } = mapProductFiltersFromApi(filters)

    const releaseDateParsed = parseDateToString(releaseDate)
    const isOut = new Date().getTime() - releaseDate.getTime() > 0

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
        relatedGamesIds: relatedGames?.map(({ id }) => id),
        isOut,
        ...rest,
    }
}
