import type { NextPage } from 'next'
import type { GetServerSideProps } from 'next'
import { prisma } from '~/server/db'
import { Product } from '~/modules/widgets/Product'
import { Breadcrumbs } from '~/modules/features/Breadcrumbs'

const ProductPage: NextPage = () => {
    return (
        <>
            <main>
                <Breadcrumbs />
                <Product />
                {/* reviews */}
            </main>
        </>
    )
}

export default ProductPage

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
