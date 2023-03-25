import type { NextPage } from 'next'

const ProductPage: NextPage = () => {
    return (
        <>
            <main>
                <div style={{ padding: '15px 0 40px 0' }}>breadcrumbs</div>
                <Product />
                {/* reviews */}
            </main>
        </>
    )
}

export default ProductPage

import type { GetServerSideProps } from 'next'
import { prisma } from '~/server/db'
import { Product } from '~/modules/widgets/Product'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    if (!params?.pid || typeof params.pid !== 'string')
        return {
            notFound: true,
        }

    const product = await prisma.product.findUnique({
        where: {
            id: params.pid,
        },
    })

    if (!product)
        return {
            notFound: true,
        }

    return { props: {} }
}
