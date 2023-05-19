import { type NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { AdminLayout } from '~/modules/widgets/AdminLayout'
import { api } from '~/modules/shared/api/apiTRPC'
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
    coverImagePath:
        'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim_cover.webp',
    horizontalImagePath:
        'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim_horizontal.webp',
    detailPageImages: [
        {
            value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim1.webp',
        },
        {
            value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim2.webp',
        },
        {
            value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim3.webp',
        },
        {
            value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim4.webp',
        },
        {
            value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim5.webp',
        },
        {
            value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim6.webp',
        },
    ],
    systemRequirementsMinimal: systemReqMinimal,
    systemRequirementsRecommended: systemReqRec,
    productType: 'game',
}

const otherProductsData: AddProductInput[] = [
    {
        name: 'The Elder Scrolls V: Skyrim Special Edition',
        desc: description,
        price: 100,
        quantityInStock: 500,
        categories: ['RPG', 'FPS'],
        characteristics: chars,
        productType: 'edition',
        filters: [
            ...filtersInit,
            { name: 'publisher', values: ['Bethesda Softworks'] },
            { name: 'developer', values: ['Bethesda Game Studios', 'Iron Galaxy Studios'] },
        ],
        releaseDate: new Date(),
        ytTrailerPath: 'lTjRZ__-278',
        ytGameplayTrailerPath: 'PjqsYzBrP-M',
        coverImagePath:
            'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim_cover.webp',
        horizontalImagePath:
            'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim_horizontal.webp',
        detailPageImages: [
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim1.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim2.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim3.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim4.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim5.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim6.webp',
            },
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
        productType: 'edition',
        filters: [
            ...filtersInit,
            { name: 'publisher', values: ['Bethesda Softworks'] },
            { name: 'developer', values: ['Bethesda Game Studios', 'Iron Galaxy Studios'] },
        ],
        releaseDate: new Date(),
        ytTrailerPath: 'JSRtYpNRoN0',
        ytGameplayTrailerPath: 'PjqsYzBrP-M',
        coverImagePath:
            'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim_cover.webp',
        horizontalImagePath:
            'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim_horizontal.webp',
        detailPageImages: [
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim1.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim2.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim3.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim4.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim5.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/skyrim6.webp',
            },
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
        coverImagePath:
            'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/elden_ring_cover.webp',
        horizontalImagePath:
            'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/elden_ring_horizontal.webp',
        verticalImagePath:
            'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/elden_ring_vertical.webp',
        detailPageImages: [
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/elden_ring_1.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/elden_ring_2.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/elden_ring_3.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/elden_ring_4.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/elden_ring_5.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/elden_ring_6.webp',
            },
        ],
        systemRequirementsMinimal: systemReqMinimal,
        systemRequirementsRecommended: systemReqRec,
        productType: 'game',
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
        coverImagePath:
            'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/starfield_cover.webp',
        horizontalImagePath:
            'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/starfield_horizontal.webp',
        verticalImagePath:
            'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/starfield_vertical.webp',
        detailPageImages: [
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/starfield_1.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/starfield_2.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/starfield_3.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/starfield_4.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/starfield_5.webp',
            },
        ],
        systemRequirementsMinimal: systemReqMinimal,
        systemRequirementsRecommended: systemReqRec,
        productType: 'game',
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
        ytTrailerPath: 'eOiUtRF8k28',
        ytGameplayTrailerPath: 'btmN-bWwv0A',
        coverImagePath:
            'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/tlou2_cover.webp',
        horizontalImagePath:
            'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/tlou2_horizontal.webp',
        verticalImagePath:
            'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/tlou2_vertical.webp',
        detailPageImages: [
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/tlou2_1.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/tlou2_2.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/tlou2_3.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/tlou2_4.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/tlou2_5.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/tlou2_6.webp',
            },
        ],
        systemRequirementsMinimal: systemReqMinimal,
        systemRequirementsRecommended: systemReqRec,
        productType: 'game',
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
        coverImagePath:
            'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/witcher3_cover.webp',
        horizontalImagePath:
            'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/witcher3_horizontal.webp',
        verticalImagePath:
            'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/witcher3_vertical.webp',
        detailPageImages: [
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/witcher3_1.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/witcher3_2.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/witcher3_3.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/witcher3_4.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/witcher3_5.webp',
            },
            {
                value: 'https://xadodtgvngwoqptchxau.supabase.co/storage/v1/object/public/product-images/witcher3_6.webp',
            },
        ],
        systemRequirementsMinimal: systemReqMinimal,
        systemRequirementsRecommended: systemReqRec,
        productType: 'game',
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

                    <div>SERVER ERROR?: {serverError}</div>
                </main>
            </AdminLayout>
        </>
    )
}

export default Test
