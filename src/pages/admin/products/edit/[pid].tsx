import type { NextPage } from 'next'
import Head from 'next/head'
import { AdminLayout } from '~/modules/widgets/AdminLayout'
import { EditProductForm } from '~/modules/widgets/ProductForm'

const ProductEdit: NextPage = () => {
    return (
        <>
            <Head>
                <title>Edit product</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <AdminLayout>
                <main>
                    <EditProductForm />
                </main>
            </AdminLayout>
        </>
    )
}

export default ProductEdit
