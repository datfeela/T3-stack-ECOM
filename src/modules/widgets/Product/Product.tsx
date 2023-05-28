import { useRouter } from 'next/router'
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
import { RelatedGames } from './components/RelatedGames/RelatedGames'
import { useScrollProductToTop } from './hooks/useScrollProductToTop'

export const Product = ({ productData }: { productData: ProductPageProps }) => {
    useScrollProductToTop()

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
        isOut,
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
        // relatedGames
        originalGameId,
        relatedGamesIds,
    } = mapDataFromApi(productData)

    const matchMedia = useMatchMedia()
    const router = useRouter()
    const commentsReviewMode = Boolean(router.query.reviewsMode)
    const recommendedGamesMode = Boolean(router.query.recommendedGamesMode)

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
        isOut,
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
        originalGameId,
        relatedGamesIds,
    }

    const recommendedGamesProps = {
        productId: id,
        expandedMode: recommendedGamesMode,
        productName: name,
    }

    const isDesktopRes =
        !matchMedia || (!!matchMedia && (matchMedia.isMore1200 || matchMedia.isMore1440))
    const isMainContentDisplayed = !commentsReviewMode && !recommendedGamesMode
    const isRecommendedDisplayed = !commentsReviewMode && recommendedGamesMode
    const isCommentsDisplayed = commentsReviewMode && !recommendedGamesMode
    const shouldDisplayFeatures = (!!features && features.length > 0) || (!!tags && tags.length > 0)

    return (
        <>
            <Head>
                <title>
                    {isMainContentDisplayed ? `Buy ${productData.name} | T3-Ecom` : null}
                    {isCommentsDisplayed ? `${productData.name} | Reviews | T3-Ecom` : null}
                    {isRecommendedDisplayed
                        ? `${productData.name} | Similar Games | T3-Ecom`
                        : null}
                </title>
            </Head>
            <Header {...headerProps} />
            {isMainContentDisplayed ? (
                <>
                    <div className='wrap'>
                        <h2 className={s.title}>About the game</h2>
                        <div className={`${s.gridRow} ${s.descRow}`}>
                            <Description {...descriptionProps} />
                            <Properties {...properties} />
                        </div>
                    </div>
                    <div className='wrap'>
                        {isDesktopRes ? (
                            <>
                                <div className={`${s.gridRow} ${s.sysReqRow}`}>
                                    <h2 className={s.title}>System requirements</h2>
                                    {shouldDisplayFeatures ? (
                                        <h2 className={s.title}>Features</h2>
                                    ) : null}
                                </div>
                                <div className={`${s.gridRow} ${s.sysReqRow}`}>
                                    <SystemRequirements {...systemReqProps} />
                                    {shouldDisplayFeatures ? <Tags {...tagsProps} /> : null}
                                </div>
                            </>
                        ) : (
                            <div className={`${s.gridRow} ${s.sysReqRow}`}>
                                <div>
                                    <h2 className={s.title}>System requirements</h2>
                                    <SystemRequirements {...systemReqProps} />
                                </div>
                                {shouldDisplayFeatures ? (
                                    <div>
                                        <h2 className={s.title}>Features</h2>
                                        <Tags {...tagsProps} />
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </div>
                    <Reviews {...reviewsProps} />
                    <RelatedGames {...relatedGamesProps} />
                    <RecommendedGames {...recommendedGamesProps} />
                </>
            ) : null}
            {isRecommendedDisplayed ? <RecommendedGames {...recommendedGamesProps} /> : null}
            {isCommentsDisplayed ? <Reviews {...reviewsProps} /> : null}
        </>
    )
}
