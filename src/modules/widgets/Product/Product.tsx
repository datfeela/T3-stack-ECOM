import { useRouter } from 'next/router'
import { api } from '~/modules/shared/api/apiTRPC'
import Head from 'next/head'
import s from './.module.scss'
import Image from 'next/image'
import { Header } from './components/Header/Header'

export const Product = () => {
    const router = useRouter()
    const { pid } = router.query

    if (pid && typeof pid !== 'string') return null

    const productId = typeof pid === 'string' ? pid : '0'

    const productData = api.products.getProductById.useQuery(productId, {
        refetchOnWindowFocus: false,
    }).data

    if (!productData) return null

    const { name, price, priceWithoutDiscount } = productData

    return (
        <>
            <Head>
                <title>Buy {productData.name}</title>
            </Head>
            {/* <Header title={name} price={price} /> */}
        </>
    )
}
