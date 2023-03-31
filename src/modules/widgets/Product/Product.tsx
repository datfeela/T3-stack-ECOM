import { useRouter } from 'next/router'
import { api } from '~/modules/shared/api/apiTRPC'
import Head from 'next/head'
import s from './Product.module.scss'
import { Header } from './components/Header/Header'
import { LoaderFullScreen } from '~/modules/shared/components/Loaders/Loaders'
import { mapProductFiltersFromApi } from '~/modules/shared/mappers/mapProductFiltersFromApi'
import { mapCategoriesFromApi } from './mappers/mapCategoriesFromApi'
import { mapImagesFromApi } from './mappers/mapImagesFromApi'

export const Product = () => {
    const router = useRouter()
    const { pid } = router.query

    if (pid && typeof pid !== 'string') return null

    const productId = typeof pid === 'string' ? pid : '0'

    const productData = api.products.getProductById.useQuery(productId, {
        refetchOnWindowFocus: false,
    }).data

    if (!productData) return <LoaderFullScreen type='dots' />

    // extract data to props

    const {
        // shared
        id,
        filters,
        // header
        name,
        price,
        priceWithoutDiscount,
        ytTrailerPath,
        ytGameplayTrailerPath,
        coverImagePath,
        horizontalImagePath,
        detailPageImages,
        categories,
        releaseDate,
        // description
        desc,
        characteristics,
        // system req
        systemRequirementsMinimal,
        systemRequirementsRecommended,
        // reviews
        ratedByCount,
        rating,
        // related
        originalGame,
        relatedGames,
    } = productData

    const categoriesMapped = mapCategoriesFromApi(categories)
    const detailPageImagesMapped = mapImagesFromApi(detailPageImages)
    const { tags, ...restFilters } = mapProductFiltersFromApi(filters)

    const headerProps = {
        title: name,
        price,
        priceWithoutDiscount,
        ytTrailerPath,
        ytGameplayTrailerPath,
        coverImagePath,
        horizontalImagePath,
        detailImages: detailPageImagesMapped,
        categories: categoriesMapped,
        releaseDate,
        filters: restFilters,
    }

    const descriptionProps = {
        desc,
        characteristics,
    }

    const systemReqProps = {
        systemRequirementsMinimal,
        systemRequirementsRecommended,
    }

    const tagsProps = {
        tags,
    }

    const reviewsProps = {
        ratedByCount,
        rating,
    }

    const relatedGamesProps = {
        originalGame,
        relatedGames,
    }

    return (
        <>
            <Head>
                <title>Buy {productData.name}</title>
            </Head>
            <Header {...headerProps} />
            <div className={s.descriptionRow}>
                {/* <Description {...descriptionProps} /> */}
                {/* switch w/ system req and tags */}
            </div>
            {/* <Reviews {...reviewsProps} /> */}
            {/* <RelatedGames {...relatedGamesProps} /> */}
            {/* <RecommendedGames/> */}
        </>
    )
}
