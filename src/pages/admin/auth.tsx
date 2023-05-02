import { type NextPage } from 'next'
import Head from 'next/head'
import { AdminLogin } from '~/modules/widgets/AdminLogin'

const Auth: NextPage = () => {
    return (
        <>
            <Head>
                <title>Test</title>
                <meta name='description' content='Пользовательское соглашение' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main>
                <div>auth</div>
                <AdminLogin />
            </main>
        </>
    )
}

export default Auth
