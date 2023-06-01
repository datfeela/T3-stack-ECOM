import s from './ProductSelector.module.scss'
import { useState } from 'react'
import { useDebouncedValue } from '~/modules/shared/hooks/useDebouncedValue'
import { Search } from '~/modules/shared/components/Search/Search'
import { LoaderFullScreen } from '~/modules/shared/components/Loaders/Loaders'
import { AdminProductCard } from '~/modules/shared/components/AdminProductCard/AdminProductCard'
import { useManyProductsData } from '~/modules/shared/hooks/api/useManyProductsData'
import { useInfiniteScroll } from '~/modules/shared/hooks/useInfiniteScroll'

export interface ProductSelectorProps {
    selectedIds: string[]
    handleChange: (value: string) => void
}

export const ProductSelector = ({ selectedIds, handleChange }: ProductSelectorProps) => {
    const [searchQuery, setSearchQuery] = useState('')

    const handleProductSelect = (id: string) => {
        handleChange(id)
    }

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
        quantity: 10,
    })

    const scrollAnchorRef = useInfiniteScroll({
        getMore: () => {
            getNextPage()
        },
        shouldGetMore: !isLoading && !isAllProductsLoaded,
        observerOptions: {
            root:
                typeof window === 'object'
                    ? document.querySelector(`${s.productsWrap}`)
                    : undefined,
        },
    })

    const products = data?.map(({ id, name, price, horizontalImagePath }, mapId) => (
        <div key={id} ref={mapId === data.length - 10 ? scrollAnchorRef : undefined}>
            <AdminProductCard
                key={id}
                id={id}
                name={name}
                price={price}
                imgSrc={horizontalImagePath}
                isWithSelect={true}
                isSelected={!!selectedIds.find((el) => el === id)}
                handleClick={handleProductSelect}
            />
        </div>
    ))

    const areProductsFound = products && products.length > 0 ? true : false
    const isNothingFound =
        searchQuery && !isLoading && (!products || products?.length <= 0) ? true : false

    return (
        <div className={s.wrap}>
            <Search
                inputName='products-search'
                value={searchQuery}
                handleChange={setSearchQuery}
                isLoading={isDebouncing || isLoading}
            />
            <div className={`${s.productsWrap}`}>
                {areProductsFound ? <> {products} </> : null}
                {isLoading ? <LoaderFullScreen type='dots' /> : null}
                {isNothingFound ? <div>Nothing was found.</div> : null}
            </div>
        </div>
    )
}
