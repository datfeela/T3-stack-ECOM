import Head from 'next/head'
import { Cart } from '~/modules/widgets/Cart'

const CartPage = () => {
    return (
        <>
            <Head>
                <title>Cart</title>
            </Head>
            <main>
                <Cart />
            </main>
        </>
    )
}

export default CartPage
