import { type NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import type { AdminInput } from '~/modules/entities/admin'
import { api } from '~/modules/shared/api/apiTRPC'
import { AdminLogin } from '~/modules/widgets/AdminLogin'

const Auth: NextPage = () => {
    const router = useRouter()

    const [loginError, setLoginError] = useState(undefined as string | undefined)

    const logIn = api.admin.logIn.useMutation({
        onSuccess: ({ success }) => {
            if (!success) return

            return router.push('/admin')
        },
        onError: (e) => {
            setLoginError(e.message)
        },
    })

    const handleLogin = (values: AdminInput) => {
        logIn.mutate(values)
        setLoginError(undefined)
    }

    return (
        <>
            <Head>
                <title>Test</title>
                <meta name='description' content='Пользовательское соглашение' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main>
                <div>auth</div>
                <AdminLogin submitForm={handleLogin} loginError={loginError} />
            </main>
        </>
    )
}

export default Auth
