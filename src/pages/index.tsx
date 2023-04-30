import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import type { MainPagePropsSerialized } from '~/modules/entities/product'
import { MainSlider } from '~/modules/widgets/MainSlider'
import { getMainPageProducts_server } from '~/server/api/trpcProcedures/productsQueries'

const Home = ({ sliderProductsData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const productsDataMapped = sliderProductsData.map((data) => ({
        ...data,
        product: {
            ...data.product,
            releaseDate: new Date(JSON.parse(data.product.releaseDate) as string),
        },
    }))

    return (
        <>
            <Head>
                <title>Title</title>
                <meta name='description' content='' />
            </Head>
            <main>
                <MainSlider productsData={productsDataMapped} />
            </main>
        </>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps<{
    sliderProductsData: MainPagePropsSerialized
}> = async () => {
    const sliderProductsData = await getMainPageProducts_server()

    return {
        props: {
            sliderProductsData: sliderProductsData.map((data) => ({
                ...data,
                product: { ...data.product, releaseDate: JSON.stringify(data.product.releaseDate) },
            })),
        },
    }
}
