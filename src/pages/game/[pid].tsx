import type { InferGetServerSidePropsType } from 'next'
import type { GetServerSideProps } from 'next'
import { prisma } from '~/server/db'
import { Product } from '~/modules/widgets/Product'
import { Breadcrumbs } from '~/modules/features/Breadcrumbs'
import type { ProductPagePropsSerialized } from '~/modules/entities/product'

const ProductPage = ({ product }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { name } = product
    const releaseDate = new Date(JSON.parse(product.releaseDate) as string)

    return (
        <>
            <main>
                <Breadcrumbs pidName={name} />
                <Product productData={{ ...product, releaseDate }} />
                {/* reviews */}
            </main>
        </>
    )
}

export default ProductPage

export const getServerSideProps: GetServerSideProps<{
    product: ProductPagePropsSerialized
}> = async ({ params }) => {
    if (!params?.pid || typeof params.pid !== 'string')
        return {
            notFound: true,
        }

    const product = await prisma.product.findUnique({
        where: {
            id: typeof params?.pid === 'string' ? params.pid : '',
        },
        include: {
            categories: true,
            characteristics: true,
            detailPageImages: true,
            filters: {
                include: {
                    values: true,
                },
            },
            wishedBy: true,
            systemRequirementsMinimal: true,
            systemRequirementsRecommended: true,
        },
    })

    if (!product)
        return {
            notFound: true,
        }

    return { props: { product: { ...product, releaseDate: JSON.stringify(product.releaseDate) } } }
}
