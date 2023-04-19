import { useRouter } from 'next/router'
import { api } from '~/modules/shared/api/apiTRPC'
import Head from 'next/head'
import s from './Product.module.scss'
import { Header } from './components/Header/Header'
import { mapDataFromApi } from './mappers/mapDataFromApi'
import { Properties } from './components/Properties/Properties'
import { Description } from './components/Description/Description'
import { Reviews } from '~/modules/features/Reviews'
import type { ProductPageProps } from '~/modules/entities/product'
import { SystemRequirements } from './components/SystemRequirements/SystemRequirements'
import { Tags } from './components/Tags/Tags'
import { useMatchMedia } from '~/modules/shared/hooks/useMatchMedia'
import { RecommendedGames } from './components/RecommendedGames/RecommendedGames'

export const Product = ({ productData }: { productData: ProductPageProps }) => {
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
        negativeScoresCount,
        positiveScoresCount,
    } = mapDataFromApi(productData)

    const matchMedia = useMatchMedia()
    const router = useRouter()
    const commentsReviewMode = Boolean(router.query.reviewsMode)

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
        productId: id,
        productName: name,
        negativeScoresCount,
        positiveScoresCount,
        expandedMode: commentsReviewMode,
        activeCommentId:
            typeof router.query.activeComment === 'string' ? router.query.activeComment : undefined,
    }

    const relatedGamesProps = {
        productId: id,
    }

    return (
        <>
            <Head>
                <title>
                    {!commentsReviewMode
                        ? `Buy ${productData.name}`
                        : `${productData.name} | Reviews`}
                </title>
            </Head>
            <Header {...headerProps} />
            {!commentsReviewMode ? (
                <>
                    <div className='wrap'>
                        <h2 className={s.title}>About the game</h2>
                        <div className={`${s.gridRow} ${s.descRow}`}>
                            <Description {...descriptionProps} />
                            <Properties {...properties} />
                        </div>
                    </div>
                    <div className='wrap'>
                        {matchMedia && (matchMedia.isMore1200 || matchMedia.isMore1440) ? (
                            <>
                                <div className={`${s.gridRow} ${s.sysReqRow}`}>
                                    <h2 className={s.title}>System requirements</h2>
                                    <h2 className={s.title}>Features</h2>
                                </div>
                                <div className={`${s.gridRow} ${s.sysReqRow}`}>
                                    <SystemRequirements {...systemReqProps} />
                                    <Tags {...tagsProps} />
                                </div>
                            </>
                        ) : (
                            <div className={`${s.gridRow} ${s.sysReqRow}`}>
                                <div>
                                    <h2 className={s.title}>System requirements</h2>
                                    <SystemRequirements {...systemReqProps} />
                                </div>
                                <div>
                                    <h2 className={s.title}>Features</h2>
                                    <Tags {...tagsProps} />
                                </div>
                            </div>
                        )}
                    </div>

                    <Reviews {...reviewsProps} />
                    {/* <RelatedGames {...relatedGamesProps} /> */}
                    <RecommendedGames {...relatedGamesProps} />
                </>
            ) : (
                <Reviews {...reviewsProps} />
            )}
        </>
    )
}
