import type { ProductFromApiDefault } from '~/modules/entities/product'
import s from './PopularProducts.module.scss'
import { mapDataFromApi } from './mappers/mapDataFromApi'
import { ProductCard } from '~/modules/shared/components/ProductCard'
import { ButtonDefault } from '~/modules/shared/components/Button/Button'
import { useMatchMedia } from '~/modules/shared/hooks/useMatchMedia'
import Image from '~/modules/shared/components/Image/Image'
import Link from 'next/link'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'
import { TitleDecorative } from '~/modules/shared/components/TitleDecorative/TitleDecorative'

interface PopularProductsProps {
    productsData: ProductFromApiDefault[]
}

export const PopularProducts = ({ productsData }: PopularProductsProps) => {
    const [MostPopularProduct, ...restPopularProducts] = mapDataFromApi(productsData)
    const matchMedia = useMatchMedia()

    const MostPopularProductEl = MostPopularProduct ? (
        <ProductCard
            key={MostPopularProduct.id}
            linkBasePathName='/game'
            view={
                matchMedia && matchMedia.isMore480
                    ? 'popular'
                    : matchMedia && matchMedia.isLess480
                    ? 'default'
                    : 'defaultLg'
            }
            imageSizes='(max-width: 480px) 100vw,
            (max-width: 768px) 300px,
            (max-width: 900px) 400px,
            (max-width: 1200px) 560px,
            700px'
            {...MostPopularProduct}
        />
    ) : null

    const restProductsEls = restPopularProducts.map((product, id) => {
        if (matchMedia && matchMedia.isMore480 && id > 2) return null
        if (matchMedia && matchMedia.isLess480 && id > 1) return null

        return (
            <ProductCard
                key={product.id}
                linkBasePathName='/game'
                view={matchMedia && matchMedia.isLess480 ? 'default' : 'popular'}
                imageSizes='(max-width: 480px) 100vw,
                (max-width: 768px) 300px,
                (max-width: 1200px) 250px,
                300px'
                {...product}
            />
        )
    })

    return (
        <div className={s.wrap}>
            <div className={`${s.wrapInner} wrap`}>
                <TitleDecorative variant={1}>Popular</TitleDecorative>
                <div className={s.products}>
                    {MostPopularProductEl}
                    <div className={s.productsSmall}>{restProductsEls}</div>
                </div>
                <Link href='/catalog?popular=true' className={s.link}>
                    <ButtonDefault
                        withDecorative={true}
                        isGlitching={true}
                        withIcon={true}
                        Icon={<SvgSelector id='arrowDefault' />}
                        shouldIconDisplay={true}
                    >
                        view all
                    </ButtonDefault>
                </Link>
            </div>
            <div className={s.bg}>
                <Image
                    src='/images/mainPage/bg1.png'
                    alt=''
                    objectFit='contain'
                    objectPosition='right'
                />
            </div>
        </div>
    )
}
