import { type NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useManyProductsData } from '~/modules/shared/hooks/api/useManyProductsData'

const Catalog: NextPage = () => {
    // todo: 10 + load more
    const { data } = useManyProductsData({ quantity: 30 })

    return (
        <>
            <Head>
                <title>Catalog</title>
                <meta name='description' content='' />
            </Head>
            <main>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {data
                        ? data.map(({ name, id }) => (
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

export default Catalog
