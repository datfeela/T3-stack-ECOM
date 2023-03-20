import type { NextPage } from 'next'
import Head from 'next/head'
import { AdminLayout } from '~/modules/widgets/AdminLayout'

const Admin: NextPage = () => {
    return (
        <>
            <Head>
                <title>Test</title>
                <meta name='description' content='Пользовательское соглашение' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <AdminLayout>
                <main>
                    <div>admin secret page</div>
                </main>
            </AdminLayout>
        </>
    )
}

export default Admin
