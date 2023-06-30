import { type NextPage } from 'next'
import Head from 'next/head'
import { Catalog } from '~/modules/widgets/Catalog'

const CatalogPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Catalog | T3-Ecom</title>
            </Head>
            <main>
                <Catalog />
            </main>
        </>
    )
}

export default CatalogPage
