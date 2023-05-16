import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import type {
    MainPageProductFromApiSerialized,
    ProductFromApiDefaultSerialized,
} from '~/modules/entities/product/types'
import { mapSerializedProductFromApi } from '~/modules/shared/mappers/mapSerializedProductFromApi'
import { mapUnserializedProductFromApi } from '~/modules/shared/mappers/mapUnserializedProductFromApi'
import { ComingSoonProducts } from '~/modules/widgets/ComingSoonProducts'
import { MainSlider } from '~/modules/widgets/MainSlider'
import { PopularProducts } from '~/modules/widgets/PopularProducts'
import { ProductsOnSale } from '~/modules/widgets/ProductsOnSale'
import {
    getMainPageProducts_server,
    getManyProducts_server,
} from '~/server/api/trpcProcedures/productsQueries'

const Home = ({
    sliderProductsData,
    popularProductsData,
    comingSoonProductsData,
    productsOnSaleData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const productsDataMapped = sliderProductsData.map((data) => ({
        ...data,
        product: mapSerializedProductFromApi(data.product),
    }))

    const popularProductsDataMapped = popularProductsData.map((product) =>
        mapSerializedProductFromApi(product),
    )
    const comingSoonProductsDataMapped = comingSoonProductsData.map((product) =>
        mapSerializedProductFromApi(product),
    )
    const productsOnSaleDataMapped = productsOnSaleData.map((product) =>
        mapSerializedProductFromApi(product),
    )

    return (
        <>
            <Head>
                <title>Title</title>
                <meta name='description' content='' />
            </Head>
            <main>
                <MainSlider productsData={productsDataMapped} />
                <PopularProducts productsData={popularProductsDataMapped} />
                {comingSoonProductsDataMapped.length > 0 ? (
                    <ComingSoonProducts productsData={comingSoonProductsDataMapped} />
                ) : null}
                {productsOnSaleDataMapped.length > 0 ? (
                    <ProductsOnSale productsData={productsOnSaleDataMapped} />
                ) : null}
            </main>
        </>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps<{
    sliderProductsData: MainPageProductFromApiSerialized[]
    popularProductsData: ProductFromApiDefaultSerialized[]
    comingSoonProductsData: ProductFromApiDefaultSerialized[]
    productsOnSaleData: ProductFromApiDefaultSerialized[]
}> = async ({ res }) => {
    // todo: uncomment when finished adding new products
    // res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=2592000')

    const sliderProductsDataPromise = getMainPageProducts_server()
    const popularProductsDataPromise = getManyProducts_server({
        quantity: 5,
        sortBy: { name: 'popularity', value: 'desc' },
    })
    const comingSoonProductsPromise = getManyProducts_server({
        quantity: 10,
        sortBy: { name: 'releaseDate', value: 'asc' },
        comingSoon: true,
    })
    const productsOnSalePromise = getManyProducts_server({
        quantity: 6,
        sortBy: { name: 'popularity', value: 'desc' },
        onSale: true,
    })

    const [sliderProductsData, popularProductsData, comingSoonProductsData, productsOnSaleData] =
        await Promise.all([
            sliderProductsDataPromise,
            popularProductsDataPromise,
            comingSoonProductsPromise,
            productsOnSalePromise,
        ])

    return {
        props: {
            sliderProductsData: sliderProductsData.map((data) => ({
                ...data,
                product: mapUnserializedProductFromApi(data.product),
            })),
            popularProductsData: popularProductsData.products.map((product) =>
                mapUnserializedProductFromApi(product),
            ),
            comingSoonProductsData: comingSoonProductsData.products.map((product) =>
                mapUnserializedProductFromApi(product),
            ),
            productsOnSaleData: productsOnSaleData.products.map((product) =>
                mapUnserializedProductFromApi(product),
            ),
        },
    }
}
