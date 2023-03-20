import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AdminLayout } from '~/modules/widgets/AdminLayout'

import type { ProductSortBy } from '~/server/api/apiTypes/productsRouterTypes'
import { BasicInput } from '~/modules/shared/components/Inputs/BasicInput'
import { api } from '~/modules/shared/api/apiTRPC'

const Products: NextPage = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState({ name: 'name', value: 'asc' } as ProductSortBy)

    const productsData = api.products.getManyProducts.useQuery({
        quantity: 10,
        searchQuery: searchQuery,
        sortBy,
    })

    const products = productsData.data?.map(
        ({ id, name, price, priceWithoutDiscount, coverImagePath }) => (
            <div
                key={id}
                style={{
                    height: '120px',
                    display: 'grid',
                    alignItems: 'center',
                    gridGap: '25px',
                    gridTemplateColumns: '100px repeat(4, 1fr)',
                }}
            >
                {coverImagePath ? (
                    <Link
                        style={{ position: 'relative', height: 100 }}
                        href={`/admin/products/edit/${id}`}
                    >
                        <Image
                            src={coverImagePath}
                            alt={name}
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </Link>
                ) : (
                    <div />
                )}
                <Link href={`/admin/products/edit/${id}`}>{name}</Link>
                <span>{price}</span>
                {priceWithoutDiscount ? <span>{priceWithoutDiscount}</span> : <div />}
                <Link href={`/admin/products/edit/${id}`}>Edit</Link>
            </div>
        ),
    )

    return (
        <>
            <Head>
                <title>Products</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <AdminLayout>
                <main>
                    <h1>Products</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <span>Search:</span>
                        <BasicInput
                            name='products-search'
                            changeHandler={(input) => {
                                setSearchQuery(input)
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <span>Sort by:</span>
                        <button
                            onClick={() => {
                                setSortBy({ name: 'price', value: 'asc' })
                            }}
                        >
                            price asc
                        </button>
                        <button
                            onClick={() => {
                                setSortBy({ name: 'price', value: 'desc' })
                            }}
                        >
                            price desc
                        </button>
                        <button
                            onClick={() => {
                                setSortBy({ name: 'name', value: 'asc' })
                            }}
                        >
                            name a-z
                        </button>
                        <button
                            onClick={() => {
                                setSortBy({ name: 'name', value: 'desc' })
                            }}
                        >
                            name z-a
                        </button>
                    </div>
                    {products}
                </main>
            </AdminLayout>
        </>
    )
}

export default Products
