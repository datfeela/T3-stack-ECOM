import type { NextPage } from 'next'
import Head from 'next/head'
import { AdminLayout } from '~/modules/widgets/AdminLayout'
import { AdminOrders } from '~/modules/widgets/AdminOrders'

const Orders: NextPage = () => {
    return (
        <>
            <Head>
                <title>Orders</title>
            </Head>
            <AdminLayout>
                <main>
                    <AdminOrders />
                </main>
            </AdminLayout>
        </>
    )
}

export default Orders
