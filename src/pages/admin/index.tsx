import type { NextPage } from 'next'
import Head from 'next/head'
import { AdminLayout } from '~/modules/widgets/AdminLayout'
import { AdminMain } from '~/modules/widgets/AdminMain'

const Admin: NextPage = () => {
    return (
        <>
            <Head>
                <title>Admin</title>
            </Head>
            <AdminLayout>
                <main>
                    <AdminMain />
                </main>
            </AdminLayout>
        </>
    )
}

export default Admin
