import s from './AdminProducts.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import type { ProductSortBy } from '~/server/api/apiTypes/productsRouterTypes'
import { api } from '~/modules/shared/api/apiTRPC'
import { Sort } from './components/Sort/Sort'
import { Search } from './components/Search/Search'
import { Product } from './components/Product/Product'

export const AdminProducts = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState({ name: 'name', value: 'asc' } as ProductSortBy)

    const productsData = api.products.getManyProducts.useQuery({
        quantity: 10,
        searchQuery: searchQuery,
        sortBy,
    })

    const products = productsData.data?.map((product) => <Product key={product.id} {...product} />)

    return (
        <div className={s.wrap}>
            <Search handleChange={setSearchQuery} />
            <Sort setSortBy={setSortBy} />
            <div className={s.productsWrap}>{products}</div>
        </div>
    )
}
