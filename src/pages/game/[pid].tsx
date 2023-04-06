import type { InferGetServerSidePropsType } from 'next'
import type { GetServerSideProps } from 'next'
import { prisma } from '~/server/db'
import { Product } from '~/modules/widgets/Product'
import { Breadcrumbs } from '~/modules/features/Breadcrumbs'

const ProductPage = ({ productName }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <main>
                <Breadcrumbs pidName={productName} />
                <Product />
                {/* reviews */}
            </main>
        </>
    )
}

export default ProductPage

export const getServerSideProps: GetServerSideProps<{
    productName: string
}> = async ({ params }) => {
    if (!params?.pid || typeof params.pid !== 'string')
        return {
            notFound: true,
        }

    const product = await prisma.product.findUnique({
        where: {
            id: typeof params?.pid === 'string' ? params.pid : '',
        },
    })

    if (!product)
        return {
            notFound: true,
        }

    return { props: { productName: product?.name } }
}
