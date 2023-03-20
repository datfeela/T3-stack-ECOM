import { signIn, getProviders, type LiteralUnion, type ClientSafeProvider } from 'next-auth/react'
import { type BuiltInProviderType } from 'next-auth/providers'
import { getServerAuthSession } from '~/server/auth'

import { type GetServerSideProps, type NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

export interface SingInProps {
    providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null
}

const SignIn: NextPage<SingInProps> = ({ providers }) => {
    const providersEls =
        providers &&
        Object.values(providers).map(({ name, id }) => (
            <button
                key={id}
                onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    signIn(id, { callbackUrl: `${window.location.origin}` })
                }}
            >
                <Image
                    src={`/sign-in-providers/${name}.png`}
                    alt={`${name}`}
                    width={200}
                    height={112}
                />
                <span>{name}</span>
            </button>
        ))

    return (
        <>
            <Head>
                <title>Sign In | feela-t3-ecom</title>
                <meta name='description' content='Sing In' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main>
                <h1>Sign In</h1>
                <div>{providersEls}</div>
            </main>
        </>
    )
}

export default SignIn

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
