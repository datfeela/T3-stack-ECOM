import { useRouter } from 'next/router'
import { api } from '~/modules/shared/api/apiTRPC'
import Head from 'next/head'
import s from './Product.module.scss'
import { Header } from './components/Header/Header'
import { LoaderFullScreen } from '~/modules/shared/components/Loaders/Loaders'
import { mapDataFromApi } from './mappers/mapDataFromApi'
import { Properties } from './components/Properties/Properties'
import { Description } from './components/Description/Description'

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
        // header
        name,
        price,
        priceWithoutDiscount,
        ytTrailerPath,
        ytGameplayTrailerPath,
        coverImagePath,
        horizontalImagePath,
        detailImages,
        properties,
        // description
        desc,
        characteristics,
        features,
        tags,
        // system req
        systemRequirementsMinimal,
        systemRequirementsRecommended,
        // reviews
        ratedByCount,
        rating,
        // related
        originalGame,
        relatedGames,
    } = mapDataFromApi(productData)

    const headerProps = {
        id,
        title: name,
        price,
        priceWithoutDiscount,
        ytTrailerPath,
        ytGameplayTrailerPath,
        coverImagePath,
        horizontalImagePath,
        detailImages,
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
        features,
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
            <div className='wrap'>
                <h2 className={s.title}>About the game</h2>
                <div className={s.descriptionRow}>
                    <Description {...descriptionProps} />
                    <Properties {...properties} />
                </div>
            </div>
            {/* switch w/ system req and tags */}
            {/* <Reviews {...reviewsProps} /> */}
            {/* <RelatedGames {...relatedGamesProps} /> */}
            {/* <RecommendedGames/> */}
        </>
    )
}
