import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import type {
    MainPageSliderPropsSerialized,
    PopularProductsDataSerialized,
} from '~/modules/entities/product'
import { MainSlider } from '~/modules/widgets/MainSlider'
import { PopularProducts } from '~/modules/widgets/PopularProducts'
import {
    getMainPageProducts_server,
    getManyProducts_server,
} from '~/server/api/trpcProcedures/productsQueries'

const Home = ({
    sliderProductsData,
    popularProductsData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const productsDataMapped = sliderProductsData.map((data) => ({
        ...data,
        product: {
            ...data.product,
            releaseDate: new Date(JSON.parse(data.product.releaseDate) as string),
        },
    }))

    const popularProductsDataMapped = popularProductsData.map((product) => ({
        ...product,
        releaseDate: new Date(JSON.parse(product.releaseDate) as string),
    }))

    return (
        <>
            <Head>
                <title>Title</title>
                <meta name='description' content='' />
            </Head>
            <main>
                <MainSlider productsData={productsDataMapped} />
                <PopularProducts productsData={popularProductsDataMapped} />
            </main>
        </>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps<{
    sliderProductsData: MainPageSliderPropsSerialized
    popularProductsData: PopularProductsDataSerialized
}> = async () => {
    const sliderProductsDataPromise = getMainPageProducts_server()
    const popularProductsDataPromise = getManyProducts_server({
        quantity: 5,
        sortBy: { name: 'popularity', value: 'desc' },
    })

    const [sliderProductsData, popularProductsData] = await Promise.all([
        sliderProductsDataPromise,
        popularProductsDataPromise,
    ])

    return {
        props: {
            sliderProductsData: sliderProductsData.map((data) => ({
                ...data,
                product: { ...data.product, releaseDate: JSON.stringify(data.product.releaseDate) },
            })),
            popularProductsData: popularProductsData.map((product) => ({
                ...product,
                releaseDate: JSON.stringify(product.releaseDate),
            })),
        },
    }
}
