import type { ProductFromApiDefault } from '~/modules/entities/product'
import s from './ProductsOnSale.module.scss'
import { mapProductsDataFromApi } from './mappers/mapProductDataFromApi'
import { ProductCard } from '~/modules/shared/components/ProductCard'
import { TitleDecorative } from '~/modules/shared/components/TitleDecorative/TitleDecorative'
import Image from '~/modules/shared/components/Image/Image'
import Link from 'next/link'
import { ButtonDefault } from '~/modules/shared/components/Button/Button'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'

interface ProductsOnSaleProps {
    productsData: ProductFromApiDefault[]
}

export const ProductsOnSale = ({ productsData }: ProductsOnSaleProps) => {
    const productsDataMapped = mapProductsDataFromApi(productsData)

    const productsEls = productsDataMapped.map((product) => {
        return (
            <ProductCard
                key={product.id}
                linkBasePathName='/game'
                view={'default'}
                imageSizes='(max-width: 1200px) 570px,
                420px'
                {...product}
            />
        )
    })

    return (
        <div className={s.wrap}>
            <div className={`${s.wrapInner} wrap`}>
                <TitleDecorative variant={3}>Sale</TitleDecorative>
                <div className={s.products}>{productsEls}</div>
                <Link href='/catalog?sale=true' className={s.link}>
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
                <div className={s.imageLeft}>
                    <Image src='/images/mainPage/bg3-1.png' alt='' objectFit='cover' />
                </div>
                <div className={s.imageRight}>
                    <Image src='/images/mainPage/bg3-2.png' alt='' objectFit='cover' />
                </div>
            </div>
        </div>
    )
}
