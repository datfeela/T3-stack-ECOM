import { type NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { api } from '~/modules/shared/api/apiTRPC'

const Home: NextPage = () => {
    const allProducts = api.products.getManyProducts.useQuery({ quantity: 10 }).data

    return (
        <>
            <Head>
                <title></title>
                <meta name='description' content='' />
            </Head>
            <main>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {allProducts
                        ? allProducts.map(({ name, id }) => (
                              <Link key={id} href={`/game/${id}`}>
                                  {name}
                              </Link>
                          ))
                        : null}
                </div>
            </main>
        </>
    )
}

export default Home
