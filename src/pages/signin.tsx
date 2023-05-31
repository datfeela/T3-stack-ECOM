import { getProviders } from 'next-auth/react'
import { getServerAuthSession } from '~/server/auth'

import { type GetServerSideProps, type NextPage } from 'next'
import Head from 'next/head'
import { SignIn } from '~/modules/widgets/SignIn'
import type { AuthProviders } from '~/modules/shared/types/types'

export interface SingInProps {
    providers: AuthProviders
}

const SignInPage: NextPage<SingInProps> = ({ providers }) => {
    return (
        <>
            <Head>
                <title>Sign In | T3-Ecom</title>
                <meta name='description' content='Sing In' />
            </Head>
            <SignIn providers={providers} />
        </>
    )
}

export default SignInPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { res } = ctx
    const providers = await getProviders()
    const session = await getServerAuthSession(ctx)

    if (res && session?.user) {
        res.writeHead(302, { Location: '/' })
        res.end()
    }

    return {
        props: { providers },
    }
}
