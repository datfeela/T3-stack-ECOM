import Head from 'next/head'
import { Cart } from '~/modules/widgets/Cart'

const CartPage = () => {
    return (
        <>
            <Head>
                <title>Cart | T3-Ecom</title>
            </Head>
            <main>
                <Cart />
            </main>
        </>
    )
}

export default CartPage
