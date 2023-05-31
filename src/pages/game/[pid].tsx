import type { GetServerSidePropsContext, InferGetServerSidePropsType, PreviewData } from 'next'
import { prisma } from '~/server/db'
import { Product } from '~/modules/widgets/Product'
import { Breadcrumbs } from '~/modules/features/Breadcrumbs'
import type { ProductPagePropsSerialized } from '~/modules/entities/product'
import type { ParsedUrlQuery } from 'querystring'

const ProductPage = ({ product }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { name } = product
    const releaseDate = new Date(JSON.parse(product.releaseDate) as string)

    return (
        <>
            <main>
                <Breadcrumbs pidName={name} />
                <Product productData={{ ...product, releaseDate }} />
            </main>
        </>
    )
}

export default ProductPage

type GetServerSidePropsT = ({
    res,
    params,
}: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => Promise<
    | { notFound: boolean; props?: undefined }
    | { props: { product: ProductPagePropsSerialized }; notFound?: undefined }
>

export const getServerSideProps: GetServerSidePropsT = async ({ res, params }) => {
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=2592000')

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
            relatedGames: {
                select: {
                    id: true,
                },
            },
        },
    })

    if (!product)
        return {
            notFound: true,
        }

    return {
        props: {
            product: {
                ...product,
                releaseDate: JSON.stringify(product.releaseDate),
            } as ProductPagePropsSerialized,
        },
    }
}
