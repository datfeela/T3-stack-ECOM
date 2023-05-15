import s from './AdminProducts.module.scss'
import { useState } from 'react'

import type { ProductSortBy } from '~/server/api/apiTypes/productsRouterTypes'
import { Product } from './components/Product/Product'
import { useDebouncedValue } from '~/modules/shared/hooks/useDebouncedValue'
import { Search } from '~/modules/shared/components/Search/Search'
import { useManyProductsData } from '~/modules/shared/hooks/api/useManyProductsData'
import { Header } from './components/Header/Header'
import { useInfiniteScroll } from '~/modules/shared/hooks/useInfiniteScroll'

export const AdminProducts = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState({ name: 'name', value: 'asc' } as ProductSortBy)

    const { value: debouncedSearchQuery, isDebouncing } = useDebouncedValue<string>(
        searchQuery,
        250,
    )

    const {
        products: productsData,
        isLoading,
        getNextPage,
        isAllProductsLoaded,
    } = useManyProductsData({
        // todo: 10 + load more
        quantity: 10,
        searchQuery: debouncedSearchQuery,
        sortBy,
        keepPreviousData: true,
    })

    const scrollAnchorRef = useInfiniteScroll({
        getMore: () => {
            getNextPage()
        },
        shouldGetMore: !isLoading && !isAllProductsLoaded,
    })

    const products = productsData?.map((product, id) => {
        return (
            <div
                key={product.id}
                ref={id === productsData.length - 10 ? scrollAnchorRef : undefined}
            >
                <Product {...product} />
            </div>
        )
    })

    return (
        <div className={s.wrap}>
            <Search
                value={searchQuery}
                inputName='products-search'
                handleChange={setSearchQuery}
                isLoading={isDebouncing}
            />
            <Header sortBy={sortBy} setSortBy={setSortBy} />
            <div className={s.productsWrap}>{products}</div>
        </div>
    )
}
