import type { GetServerSidePropsContext, InferGetServerSidePropsType, PreviewData } from 'next'
import { prisma } from '~/server/db'
import type { ParsedUrlQuery } from 'querystring'
import Head from 'next/head'
import { AdminLayout } from '~/modules/widgets/AdminLayout'
import { AdminOrder } from '~/modules/widgets/AdminOrder'

const ProductPage = ({ pid }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <Head>
                <title>Order {pid}</title>
            </Head>
            <AdminLayout>
                <main>
                    <AdminOrder id={pid} />
                </main>
            </AdminLayout>
        </>
    )
}

export default ProductPage

type GetServerSidePropsT = ({
    res,
    params,
}: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => Promise<
    { notFound: true; props?: undefined } | { notFound?: undefined; props: { pid: string } }
>

export const getServerSideProps: GetServerSidePropsT = async ({ res, params }) => {
    if (!params?.pid || typeof params.pid !== 'string')
        return {
            notFound: true,
        }

    const order = await prisma.order.findUnique({
        where: {
            id: typeof params?.pid === 'string' ? params.pid : '',
        },
    })

    if (!order)
        return {
            notFound: true,
        }

    return { props: { pid: params.pid } }
}
