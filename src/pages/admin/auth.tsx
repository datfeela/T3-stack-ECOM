import { type NextPage } from 'next'
import Head from 'next/head'
import { AdminLogin } from '~/modules/widgets/AdminLogin'

const Auth: NextPage = () => {
    return (
        <>
            <Head>
                <title>Admin Auth</title>
            </Head>
            <main>
                <AdminLogin />
            </main>
        </>
    )
}

export default Auth
