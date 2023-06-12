import { Breadcrumbs } from '~/modules/features/Breadcrumbs'
import s from './FavoritesList.module.scss'
import { useFavorites } from './hooks/useFavorites'
import { DotsLoader } from '~/modules/shared/components/Loaders/Loaders'
import { ProductCard } from '~/modules/shared/components/ProductCard'
import { useInfiniteScroll } from '~/modules/shared/hooks/useInfiniteScroll'

export const FavoritesList = () => {
    const { productsData, isError, isLoading, getNextPage, isAllProductsLoaded } = useFavorites()

    const scrollAnchorRef = useInfiniteScroll({
        shouldGetMore: !isLoading && !isAllProductsLoaded,
        getMore: () => {
            getNextPage()
        },
    })

    const favoritesEls = productsData?.map((props, mapId) => {
        return (
            <div
                className={`${s.product} ${mapId % 2 === 1 ? s.product_bg : ''}`}
                key={props.id}
                ref={mapId === productsData.length - 4 ? scrollAnchorRef : undefined}
            >
                <ProductCard key={props.id} view='favorites' {...props} imageSizes='150px' />
            </div>
        )
    })

    return (
        <>
            <Breadcrumbs />
            <div className={`${s.wrap} wrap`}>
                <h1>Favorite products</h1>
                {!!productsData ? <div>{favoritesEls}</div> : null}
                {isLoading ? (
                    <div className={s.loader}>
                        <DotsLoader />
                    </div>
                ) : null}
                {isError ? <div>Something went wrong...</div> : null}
            </div>
        </>
    )
}
