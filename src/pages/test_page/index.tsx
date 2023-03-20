import { GetServerSideProps, type NextPage } from 'next'
import Head from 'next/head'
import { getServerAuthSession } from '~/server/auth'

const Test: NextPage = () => {
    return (
        <>
            <Head>
                <title>Test</title>
                <meta name='description' content='Пользовательское соглашение' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main> content </main>
        </>
    )
}

export default Test

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { res } = ctx
    const session = await getServerAuthSession(ctx)

    if (res && session === null) {
        res.writeHead(403)
        res.end()
    }

    return {
        props: {},
    }
}
