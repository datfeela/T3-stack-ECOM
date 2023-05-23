import type { NextPage } from 'next'
import Head from 'next/head'
import { AdminContentEdit } from '~/modules/widgets/AdminContentEdit'
import { AdminLayout } from '~/modules/widgets/AdminLayout'

const AdminContent: NextPage = () => {
    return (
        <>
            <Head>
                <title>Content</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <AdminLayout>
                <main>
                    <AdminContentEdit />
                </main>
            </AdminLayout>
        </>
    )
}

export default AdminContent
