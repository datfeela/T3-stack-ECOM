import type { NextPage } from 'next'
import Head from 'next/head'
import { AdminLayout } from '~/modules/widgets/AdminLayout'
import { AdminMainPageProducts } from '~/modules/widgets/AdminMainPageProducts'

const Admin: NextPage = () => {
    return (
        <>
            <Head>
                <title>Main page content</title>
            </Head>
            <AdminLayout>
                <main>
                    <AdminMainPageProducts />
                </main>
            </AdminLayout>
        </>
    )
}

export default Admin
