import type { NextPage } from 'next'
import Head from 'next/head'
import { AdminLayout } from '~/modules/widgets/AdminLayout'
import { AddProductForm } from '~/modules/widgets/ProductForm'

const Products: NextPage = () => {
    return (
        <>
            <AdminLayout>
                <main>
                    <AddProductForm />
                </main>
            </AdminLayout>
        </>
    )
}

export default Products
