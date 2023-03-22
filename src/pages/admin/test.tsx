import { type NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { AdminLayout } from '~/modules/widgets/AdminLayout'
import { env } from '~/env.mjs'
import { api } from '~/modules/shared/api/apiTRPC'
import type { AddProductInput } from '~/modules/widgets/ProductForm'

const Test: NextPage = () => {
    const apiContext = api.useContext()
    const [serverError, setServerError] = useState(undefined as string | undefined)

    const init = api.categories.initialize.useMutation({
        onMutate: async () => {
            await apiContext.categories.getAllCategories.cancel()
            const optimisticUpdate = apiContext.categories.getAllCategories.getData()

            if (optimisticUpdate) {
                apiContext.categories.getAllCategories.setData(undefined, optimisticUpdate)
            }
        },
        onSuccess: async () => {
            await apiContext.categories.getAllCategories.invalidate()
            setServerError(undefined)
        },
        onError: (err) => {
            setServerError(err.message)
        },
    })

    const deleteAll = api.categories.resetDB.useMutation({
        onSuccess: async (data) => {
            await apiContext.categories.getAllCategories.invalidate()
            console.log(data)
            setServerError(undefined)
        },
        onError: (err) => {
            setServerError(err.message)
        },
    })

    const deleteProducts = api.products.deleteAllProducts.useMutation()

    const categories = api.categories.getAllCategories.useQuery()

    // add product
    const addProduct = api.products.addProduct.useMutation({
        onMutate: async () => {
            await apiContext.products.getManyProducts.cancel()
            const optimisticUpdate = apiContext.products.getManyProducts.getData()

            if (optimisticUpdate) {
                apiContext.products.getManyProducts.setData({ quantity: 10 }, optimisticUpdate)
            }
        },
        onSuccess: async () => {
            await apiContext.products.getManyProducts.invalidate()
            setServerError(undefined)
        },
        onError: (err) => {
            setServerError(err.message)
        },
    })

    const productData: AddProductInput = {
        name: 'Igora goda',
        desc: 'igora tak horosha! ou mein got...',
        price: '100',
        coverImagePath: env.NEXT_PUBLIC_PRODUCT_IMAGES_PATH + '5zYCHu9AfRjDTDRTrwtRY.png',
        categories: ['RPG', 'FPS'],
        characteristics: [
            { name: 'char1', value: 'value1' },
            { name: 'char2', value: 'value2' },
        ],
        filters: [
            { name: 'gamemodes', values: ['singleplayer'] },
            { name: 'publisher', values: ['BGPR'] },
        ],
        releaseDate: new Date(),
    }

    return (
        <>
            <Head>
                <title>Test</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <AdminLayout>
                <main>
                    <div>admin secret test</div>
                    <div
                        onClick={() => {
                            console.log(categories.data)
                        }}
                    >
                        LOG CATEGORIES
                    </div>
                    <div
                        onClick={() => {
                            init.mutate()
                        }}
                    >
                        INIT
                    </div>
                    <div
                        onClick={() => {
                            deleteAll.mutate()
                        }}
                    >
                        RESET DB
                    </div>
                    <div
                        onClick={() => {
                            addProduct.mutate(productData)
                        }}
                    >
                        ADD PRODUCT
                    </div>
                    <div
                        onClick={() => {
                            deleteProducts.mutate()
                        }}
                    >
                        DELETE PRODUCTS
                    </div>
                    <div>SERVER ERROR?: {serverError}</div>
                </main>
            </AdminLayout>
        </>
    )
}

export default Test
