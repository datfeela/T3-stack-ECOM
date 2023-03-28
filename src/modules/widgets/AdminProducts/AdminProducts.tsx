import s from './AdminProducts.module.scss'
import { useState } from 'react'

import type { ProductSortBy } from '~/server/api/apiTypes/productsRouterTypes'
import { api } from '~/modules/shared/api/apiTRPC'
import { Sort } from './components/Sort/Sort'
import { Product } from './components/Product/Product'
import { useDebouncedValue } from '~/modules/shared/hooks/useDebouncedValue'
import { Search } from '~/modules/shared/components/Search/Search'

export const AdminProducts = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState({ name: 'name', value: 'asc' } as ProductSortBy)

    const { value: debouncedSearchQuery, isDebouncing } = useDebouncedValue<string>(
        searchQuery,
        250,
    )

    const productsData = api.products.getManyProducts.useQuery({
        quantity: 10,
        searchQuery: debouncedSearchQuery,
        sortBy,
    })

    const products = productsData.data?.map((product) => <Product key={product.id} {...product} />)

    return (
        <div className={s.wrap}>
            <Search
                value={searchQuery}
                inputName='products-search'
                handleChange={setSearchQuery}
                isLoading={isDebouncing}
            />
            <Sort setSortBy={setSortBy} />
            <div className={s.productsWrap}>{products}</div>
        </div>
    )
}
