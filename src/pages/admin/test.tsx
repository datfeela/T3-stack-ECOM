import { type NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { AdminLayout } from '~/modules/widgets/AdminLayout'
import { api } from '~/modules/shared/api/apiTRPC'
import { ProductToWishes } from '~/modules/features/ProductToWishes'
import { useUserWishes } from '~/modules/entities/user/hooks/useUserWishes'
import type { AddProductInput } from '~/modules/widgets/ProductForm'
import type { FilterName } from '~/modules/shared/types/productTypes'

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

const description =
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum, beatae consectetur. Nulla, vero! Est nostrum modi minus, perferendis sit amet maxime voluptas soluta ex officiis necessitatibus facilis voluptates error! Aut impedit dolorum sit ex facere fugiat accusamus, sequi in consequuntur placeat porro blanditiis perspiciatis ad animi suscipit laboriosam ipsa vel necessitatibus aliquid hic, iusto similique molestiae doloremque! Nobis optio, possimus nostrum atque beatae iure accusamus provident. Quidem, vel quaerat! Soluta rerum maxime nihil aliquam suscipit quaerat, corrupti reprehenderit perspiciatis consectetur error sint nesciunt omnis deserunt dolores fugit. Commodi, maiores velit sequi voluptate, quibusdam delectus nam illo modi, labore soluta quae.'

const chars = [
    { name: 'subtitle 1', value: description },
    { name: 'subtitle 2', value: description },
]

const filtersInit = [
    { name: 'features', values: ['achievements', 'gamepad support'] },
    { name: 'platforms', values: ['ps', 'windows'] },
    { name: 'gamemodes', values: ['singleplayer'] },
] as { name: FilterName; values: string[] }[]

const productData: AddProductInput = {
    id: 'clfqpu0z200duess0znddvkqf',
    name: 'The Elder Scrolls V: Skyrim',
    desc: description,
    price: 100,
    quantityInStock: 500,
    categories: ['RPG', 'FPS'],
    characteristics: chars,
    filters: [
        ...filtersInit,
        { name: 'publisher', values: ['Bethesda Softworks'] },
        { name: 'developer', values: ['Bethesda Game Studios', 'Iron Galaxy Studios'] },
    ],
    releaseDate: new Date(),
    ytTrailerPath: 'JSRtYpNRoN0',
    ytGameplayTrailerPath: 'PjqsYzBrP-M',
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
}

const otherProductsData: AddProductInput[] = [
    {
        name: 'The Elder Scrolls V: Skyrim Special Edition',
        desc: description,
        price: 100,
        quantityInStock: 500,
        categories: ['RPG', 'FPS'],
        characteristics: chars,
        filters: [
            ...filtersInit,
            { name: 'publisher', values: ['Bethesda Softworks'] },
            { name: 'developer', values: ['Bethesda Game Studios', 'Iron Galaxy Studios'] },
        ],
        releaseDate: new Date(),
        ytTrailerPath: 'lTjRZ__-278',
        ytGameplayTrailerPath: 'PjqsYzBrP-M',
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
        desc: description,
        price: 100,
        quantityInStock: 500,
        categories: ['RPG', 'FPS'],
        characteristics: chars,
        filters: [
            ...filtersInit,
            { name: 'publisher', values: ['Bethesda Softworks'] },
            { name: 'developer', values: ['Bethesda Game Studios', 'Iron Galaxy Studios'] },
        ],
        releaseDate: new Date(),
        ytTrailerPath: 'JSRtYpNRoN0',
        ytGameplayTrailerPath: 'PjqsYzBrP-M',
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
        name: 'Elden Ring',
        desc: description,
        price: 100,
        quantityInStock: 0,
        categories: ['RPG'],
        characteristics: chars,
        filters: [
            ...filtersInit,
            { name: 'publisher', values: ['Bandai Namco Entertainment'] },
            { name: 'developer', values: ['FromSoftware'] },
        ],
        releaseDate: new Date('2017-01-26'),
        ytTrailerPath: 'K_03kFqWfqs',
        ytGameplayTrailerPath: 'E3Huy2cdih0',
        coverImagePath: '/images/product/elden_ring_cover.jpg',
        horizontalImagePath: '/images/product/elden_ring_horizontal.webp',
        verticalImagePath: '/images/product/elden_ring_vertical.webp',
        detailPageImages: [
            { value: '/images/product/elden_ring_1.jpg' },
            { value: '/images/product/elden_ring_2.jpg' },
            { value: '/images/product/elden_ring_3.jpg' },
            { value: '/images/product/elden_ring_4.webp' },
            { value: '/images/product/elden_ring_5.jpg' },
            { value: '/images/product/elden_ring_6.jpg' },
        ],
        systemRequirementsMinimal: systemReqMinimal,
        systemRequirementsRecommended: systemReqRec,
    },
    {
        name: 'Starfield',
        desc: description,
        price: 100,
        quantityInStock: 500,
        categories: ['RPG'],
        characteristics: chars,
        filters: [
            ...filtersInit,
            { name: 'publisher', values: ['Bethesda Softworks'] },
            { name: 'developer', values: ['Bethesda Game Studios'] },
        ],
        releaseDate: new Date('2023-07-01'),
        ytTrailerPath: 'pYqyVpCV-3c',
        ytGameplayTrailerPath: 'zmb2FJGvnAw',
        coverImagePath: '/images/product/starfield_cover.jpg',
        horizontalImagePath: '/images/product/starfield_horizontal.webp',
        verticalImagePath: '/images/product/starfield_vertical.jpg',
        detailPageImages: [
            { value: '/images/product/starfield_1.jpg' },
            { value: '/images/product/starfield_2.jpeg' },
            { value: '/images/product/starfield_3.jpeg' },
            { value: '/images/product/starfield_4.jpg' },
            { value: '/images/product/starfield_5.jpeg' },
        ],
        systemRequirementsMinimal: systemReqMinimal,
        systemRequirementsRecommended: systemReqRec,
    },
    {
        name: 'The Last of Us Part II',
        desc: description,
        price: 100,
        quantityInStock: 500,
        categories: ['survival horror', 'stealth', 'action'],
        characteristics: chars,
        filters: [
            { name: 'features', values: ['achievements', 'gamepad support'] },
            { name: 'platforms', values: ['ps'] },
            { name: 'gamemodes', values: ['singleplayer'] },
            { name: 'publisher', values: ['Sony Interactive Entertainment'] },
            { name: 'developer', values: ['Naughty Dog'] },
        ],
        releaseDate: new Date('2020-06-23'),
        ytTrailerPath: 'vhII1qlcZ4E',
        ytGameplayTrailerPath: 'btmN-bWwv0A',
        coverImagePath: '/images/product/tlou2_cover.jpg',
        horizontalImagePath: '/images/product/tlou2_horizontal.jpg',
        verticalImagePath: '/images/product/tlou2_vertical.jpg',
        detailPageImages: [
            { value: '/images/product/tlou2_1.jpg' },
            { value: '/images/product/tlou2_2.jpg' },
            { value: '/images/product/tlou2_3.jpg' },
            { value: '/images/product/tlou2_4.jpg' },
            { value: '/images/product/tlou2_5.jpeg' },
            { value: '/images/product/tlou2_6.jpeg' },
        ],
        systemRequirementsMinimal: systemReqMinimal,
        systemRequirementsRecommended: systemReqRec,
    },
    {
        name: 'The Witcher 3: Wild Hunt',
        desc: description,
        price: 100,
        quantityInStock: 500,
        categories: ['RPG'],
        characteristics: chars,
        filters: [
            ...filtersInit,
            { name: 'publisher', values: ['CD Projekt RED'] },
            { name: 'developer', values: ['CD Projekt RED'] },
        ],
        releaseDate: new Date('2015-08-22'),
        ytTrailerPath: '53MyR_Z3i1w',
        ytGameplayTrailerPath: 'YdHc3JZixRY',
        coverImagePath: '/images/product/witcher3_cover.jpg',
        horizontalImagePath: '/images/product/witcher3_horizontal.jpg',
        verticalImagePath: '/images/product/witcher3_vertical.jpg',
        detailPageImages: [
            { value: '/images/product/witcher3_1.jpg' },
            { value: '/images/product/witcher3_2.jpg' },
            { value: '/images/product/witcher3_3.jpg' },
            { value: '/images/product/witcher3_4.jpg' },
            { value: '/images/product/witcher3_5.jpg' },
            { value: '/images/product/witcher3_6.jpg' },
        ],
        systemRequirementsMinimal: systemReqMinimal,
        systemRequirementsRecommended: systemReqRec,
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
