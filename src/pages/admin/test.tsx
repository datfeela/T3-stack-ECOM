import { type NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { AdminLayout } from '~/modules/widgets/AdminLayout'
import { api } from '~/modules/shared/api/apiTRPC'
import { ProductToWishes } from '~/modules/features/ProductToWishes'
import { useUserWishes } from '~/modules/entities/user/hooks/useUserWishes'
import type { AddProductInput } from '~/modules/widgets/ProductForm'

const systemReqMinimal = {
    operatingSystem:
        'Windows 8.1, Windows 8, Windows 7 Service Pack 1, Windows Vista Service Pack 2 (64-bit)',
    cpu: 'Intel Core 2 Quad Q6600 at 2.4 GHz or AMD Phenom 9850 at 2.5 GHz',
    memory: '4 GB RAM',
    freeSpace: '65 GB of free space',
    gpu: 'DirectX 10-compatible GPU: GeForce 9800GT 1GB or ATI Radeon HD 4870 1GB',
    soundHardware: 'DirectX 10 compatible sound card',
}

const systemReqRec = {
    operatingSystem: 'Windows 8.1, Windows 8, Windows 7 (SP1) (64-bit)',
    cpu: 'Intel Core i5 3470 @ 3.2 GHz / AMD X8 FX-8350 @ 4.0 GHz',
    memory: '8 GB RAM',
    freeSpace: '65 GB of free space',
    gpu: 'NVIDIA GTX 660, 2GB / AMD HD7870 2GB',
    soundHardware: 'DirectX 10 compatible sound card',
}

const productData: AddProductInput = {
    id: 'clfqpu0z200duess0znddvkqf',
    name: 'The Elder Scrolls V: Skyrim',
    desc: 'igora tak horosha! ou mein got...',
    price: 100,
    quantityInStock: 500,
    categories: ['RPG', 'FPS'],
    characteristics: [
        { name: 'char1', value: 'value1' },
        { name: 'char2', value: 'value2' },
    ],
    filters: [
        { name: 'gamemodes', values: ['singleplayer'] },
        { name: 'publisher', values: ['Bethesda Softworks'] },
        { name: 'developer', values: ['Bethesda Game Studios', 'Iron Galaxy Studios'] },
    ],
    releaseDate: new Date(),
    ytTrailerPath: 'yt.com',
    detailPageImages: [],
    systemRequirementsMinimal: systemReqMinimal,
    systemRequirementsRecommended: systemReqRec,
}

const otherProductsData: AddProductInput[] = [
    {
        name: 'The Elder Scrolls V: Skyrim Special Edition',
        desc: 'igora tak horosha! ou mein got...',
        price: 100,
        quantityInStock: 500,
        categories: ['RPG', 'FPS'],
        characteristics: [
            { name: 'char1', value: 'value1' },
            { name: 'char2', value: 'value2' },
        ],
        filters: [
            { name: 'gamemodes', values: ['singleplayer'] },
            { name: 'publisher', values: ['Bethesda Softworks'] },
            { name: 'developer', values: ['Bethesda Game Studios', 'Iron Galaxy Studios'] },
        ],
        releaseDate: new Date(),
        ytTrailerPath: 'yt.com',
        coverImagePath: '/images/product/skyrim_cover.jpg',
        horizontalImagePath: '/images/product/skyrim_horizontal.jpg',
        detailPageImages: [
            { value: '/images/product/skyrim1.jpg' },
            { value: '/images/product/skyrim2.jpg' },
            { value: '/images/product/skyrim3.jpg' },
            { value: '/images/product/skyrim4.jpg' },
            { value: '/images/product/skyrim5.jpeg' },
            { value: '/images/product/skyrim6.jpeg' },
        ],
        systemRequirementsMinimal: systemReqMinimal,
        systemRequirementsRecommended: systemReqRec,
        originalGameId: 'clfqpu0z200duess0znddvkqf',
    },
    {
        name: 'The Elder Scrolls V: Skyrim Legendary Edition',
        desc: 'igora tak horosha! ou mein got...',
        price: 100,
        quantityInStock: 500,
        categories: ['RPG', 'FPS'],
        characteristics: [
            { name: 'char1', value: 'value1' },
            { name: 'char2', value: 'value2' },
        ],
        filters: [
            { name: 'gamemodes', values: ['singleplayer'] },
            { name: 'publisher', values: ['Bethesda Softworks'] },
            { name: 'developer', values: ['Bethesda Game Studios', 'Iron Galaxy Studios'] },
        ],
        releaseDate: new Date(),
        ytTrailerPath: 'yt.com',
        detailPageImages: [],
        systemRequirementsMinimal: systemReqMinimal,
        systemRequirementsRecommended: systemReqRec,
        originalGameId: 'clfqpu0z200duess0znddvkqf',
    },
]

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

    let isProductInWishes = false

    const wishedProducts = useUserWishes()
    const gottenProduct = api.products.getProductById.useQuery('clfjdffah001aes243q9je0fz')

    if (wishedProducts) {
        const product = wishedProducts.find((item) => {
            return item.id === gottenProduct.data?.id
        })
        console.log('product', product)

        if (product) isProductInWishes = true
    }

    console.log('wishedProducts', wishedProducts)
    console.log('isProductInWishes', isProductInWishes)

    //

    const addReview = api.products.addReviewToProduct.useMutation()

    return (
        <>
            <Head>
                <title>Test</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <AdminLayout>
                <main>
                    <div>admin secret test</div>
                    {/* <div
                        onClick={() => {
                            console.log(categories.data)
                        }}
                    >
                        LOG CATEGORIES
                    </div> */}
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
                            otherProductsData.forEach((product) => {
                                addProduct.mutate(product)
                            })
                        }}
                    >
                        ADD RELATED PRODUCTS
                    </div>

                    <div
                        onClick={() => {
                            deleteProducts.mutate()
                        }}
                    >
                        DELETE PRODUCTS
                    </div>
                    {gottenProduct.data ? (
                        <ProductToWishes
                            productId={gottenProduct.data.id}
                            isActive={isProductInWishes}
                        />
                    ) : null}

                    <div
                        onClick={() => {
                            if (gottenProduct.data && typeof gottenProduct.data.id === 'string')
                                addReview.mutate({
                                    productId: gottenProduct.data?.id,
                                    rating: 4,
                                    message: 'nisouu2',
                                })
                        }}
                    >
                        add review
                    </div>

                    <div>SERVER ERROR?: {serverError}</div>
                </main>
            </AdminLayout>
        </>
    )
}

export default Test
