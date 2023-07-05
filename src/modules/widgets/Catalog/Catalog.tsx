import s from './Catalog.module.scss'
import { useState } from 'react'
import { ProductCard } from '~/modules/shared/components/ProductCard'
import { useManyProductsData } from '~/modules/shared/hooks/api/useManyProductsData'
import { useDebouncedValue } from '~/modules/shared/hooks/useDebouncedValue'
import { useInfiniteScroll } from '~/modules/shared/hooks/useInfiniteScroll'
import { mapProductDataFromApi } from './mappers/mapProductDataFromApi'
import { DotsLoader } from '~/modules/shared/components/Loaders/Loaders'
import { useMatchMedia } from '~/modules/shared/hooks/useMatchMedia'
import type { ProductSortBy } from '~/server/api/apiTypes/productsRouterTypes'
import { Header } from './components/Header/Header'

export const Catalog = () => {
    const matchMedia = useMatchMedia()

    const [searchQuery, setSearchQuery] = useState('')

    const { value: debouncedSearchQuery, isDebouncing } = useDebouncedValue<string>(
        searchQuery,
        250,
    )

    const [sortBy, setSortBy] = useState<ProductSortBy>({
        name: 'popularity',
        value: 'desc',
    })

    const {
        products: data,
        isLoading,
        getNextPage,
        isAllProductsLoaded,
    } = useManyProductsData({
        searchQuery: debouncedSearchQuery,
        quantity: 16,
        sortBy,
        keepPreviousData: true,
    })

    const scrollAnchorRef = useInfiniteScroll({
        getMore: () => {
            getNextPage()
        },
        shouldGetMore: !isLoading && !isAllProductsLoaded,
    })

    const productsDataMapped = mapProductDataFromApi(data)

    const products = productsDataMapped?.map(
        ({ id, verticalImagePath, horizontalImagePath, ...rest }, mapId) => (
            <div
                key={id}
                ref={mapId === productsDataMapped.length - 9 ? scrollAnchorRef : undefined}
            >
                <ProductCard
                    key={id}
                    id={id}
                    imageSizes='(max-width: 480px) 100vw,
                        (max-width: 600px) 400px,
                        (max-width: 768px) 360px,
                        (max-width: 1000px) 420px,
                        (max-width: 1200px) 360px,
                        320px'
                    imgPath={
                        matchMedia && matchMedia.isLess480 ? horizontalImagePath : verticalImagePath
                    }
                    view='catalog'
                    linkBasePathName='/game'
                    {...rest}
                />
            </div>
        ),
    )

    const areProductsFound = products && products.length > 0 ? true : false
    const isNothingFound =
        searchQuery && !isLoading && (!products || products?.length <= 0) ? true : false

    return (
        <div className={`${s.wrap} wrap`}>
            <div></div>
            <Header sortBy={sortBy} setSortBy={setSortBy} />
            <div className={s.sidebar}>sidebar</div>
            <div className={`${s.productsWrap}`}>
                {areProductsFound ? <div className={s.products}>{products}</div> : null}
                {isLoading || isDebouncing ? (
                    <div className={s.loader}>
                        <DotsLoader />
                    </div>
                ) : null}
                {isNothingFound ? <div>Nothing was found.</div> : null}
            </div>
        </div>
    )
}
