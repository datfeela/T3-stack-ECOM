import type { NextPage } from 'next'
import Head from 'next/head'
import { AdminLayout } from '~/modules/widgets/AdminLayout'
import { AdminProducts } from '~/modules/widgets/AdminProducts'

const Products: NextPage = () => {
    return (
        <>
            <Head>
                <title>Products</title>
            </Head>
            <AdminLayout>
                <main>
                    <h1>Products</h1>
                    <AdminProducts />
                </main>
            </AdminLayout>
        </>
    )
}

export default Products
