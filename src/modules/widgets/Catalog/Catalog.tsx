import s from './Catalog.module.scss'
import { useState } from 'react'
import { ProductCard } from '~/modules/shared/components/ProductCard'
import { useManyProductsData } from '~/modules/shared/hooks/api/useManyProductsData'
import { useDebouncedValue } from '~/modules/shared/hooks/useDebouncedValue'
import { useInfiniteScroll } from '~/modules/shared/hooks/useInfiniteScroll'
import { mapProductDataFromApi } from './mappers/mapProductDataFromApi'
import { DotsLoader } from '~/modules/shared/components/Loaders/Loaders'
import { useMatchMedia } from '~/modules/shared/hooks/useMatchMedia'

export const Catalog = () => {
    const matchMedia = useMatchMedia()

    const [searchQuery, setSearchQuery] = useState('')

    const { value: debouncedSearchQuery, isDebouncing } = useDebouncedValue<string>(
        searchQuery,
        250,
    )

    const {
        products: data,
        isLoading,
        getNextPage,
        isAllProductsLoaded,
    } = useManyProductsData({
        searchQuery: debouncedSearchQuery,
        quantity: 16,
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
                    imageSizes='100px'
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
            <div>sort by</div>
            <div className={s.sidebar}>sidebar</div>
            <div className={`${s.productsWrap}`}>
                {areProductsFound ? <div className={s.products}>{products}</div> : null}
                {isLoading ? (
                    <div className={s.loader}>
                        <DotsLoader />
                    </div>
                ) : null}
                {isNothingFound ? <div>Nothing was found.</div> : null}
            </div>
        </div>
    )
}
