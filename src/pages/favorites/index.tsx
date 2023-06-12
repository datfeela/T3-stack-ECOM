import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { FavoritesList } from '~/modules/widgets/FavoritesList'
import { getServerAuthSession } from '~/server/auth'

const FavoritesPage = () => {
    return (
        <>
            <Head>
                <title>Favorites | T3-Ecom</title>
            </Head>
            <main>
                <FavoritesList />
            </main>
        </>
    )
}

export default FavoritesPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { res } = ctx
    const session = await getServerAuthSession(ctx)

    if (res && !session?.user) {
        res.writeHead(302, { Location: '/signin' })
        res.end()
    }

    return {
        props: {},
    }
}
