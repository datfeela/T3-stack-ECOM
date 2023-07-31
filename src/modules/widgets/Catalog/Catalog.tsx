import s from './Catalog.module.scss'
import { ProductCard } from '~/modules/shared/components/ProductCard'
import { DotsLoader } from '~/modules/shared/components/Loaders/Loaders'
import { useMatchMedia } from '~/modules/shared/hooks/useMatchMedia'
import { Header } from './components/Header/Header'
import { Sidebar } from './components/Sidebar/Sidebar'
import { useCatalogFilters } from './hooks/useCatalogFilters'
import { useCatalogProductsData } from './hooks/useCatalogProductsData'
import { useFiltersVisibility } from './hooks/useFiltersVisibility'

export const Catalog = () => {
    const matchMedia = useMatchMedia()

    const {
        searchQuery,
        setSearchQuery,
        debouncedSearchQuery,
        isDebouncing,
        sortBy,
        setSortBy,
        advancedFilters,
        setAdvancedFilters,
    } = useCatalogFilters()

    const { productData, isLoading, isFetching, scrollAnchorRef } = useCatalogProductsData({
        sortBy,
        debouncedSearchQuery,
        advancedFilters,
    })

    const { isFiltersVisible, toggleFiltersDisplay } = useFiltersVisibility()

    const products = productData?.map(
        ({ id, verticalImagePath, horizontalImagePath, ...rest }, mapId) => (
            <div key={id} ref={mapId === productData.length - 9 ? scrollAnchorRef : undefined}>
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

    const isNothingFound = !isLoading && (!products || products?.length <= 0) ? true : false

    return (
        <div className={`${s.wrap} wrap`}>
            <div></div>
            <Header
                sortBy={sortBy}
                setSortBy={setSortBy}
                toggleFiltersDisplay={toggleFiltersDisplay}
            />
            <Sidebar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                advancedFilters={advancedFilters}
                handleFiltersChange={setAdvancedFilters}
                areProductsLoading={isFetching}
                isFiltersVisible={isFiltersVisible}
                toggleFiltersDisplay={toggleFiltersDisplay}
            />
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
