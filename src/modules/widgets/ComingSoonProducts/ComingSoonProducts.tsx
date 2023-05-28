import type { ProductFromApiDefault } from '~/modules/entities/product'
import s from './ComingSoonProducts.module.scss'
import { mapProductsDataFromApi } from './mappers/mapProductDataFromApi'
import { ProductCard } from '~/modules/shared/components/ProductCard'
import { TitleDecorative } from '~/modules/shared/components/TitleDecorative/TitleDecorative'
import Image from '~/modules/shared/components/Image/Image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import { SliderButton } from '~/modules/shared/components/SliderButton/SliderButton'

interface ComingSoonProductsProps {
    productsData: ProductFromApiDefault[]
}

export const ComingSoonProducts = ({ productsData }: ComingSoonProductsProps) => {
    const productsDataMapped = mapProductsDataFromApi(productsData)

    const productsEls = productsDataMapped.map((product) => {
        return (
            <SwiperSlide className={s.slide} key={product.id}>
                <ProductCard
                    linkBasePathName='/game'
                    view={'vertical'}
                    imageSizes='(max-width: 480px) 100vw,
                300px'
                    {...product}
                />
            </SwiperSlide>
        )
    })

    return (
        <div className={s.wrap}>
            <div className={`${s.wrapInner} wrap`}>
                <TitleDecorative variant={2}>Coming soon</TitleDecorative>
                <div className={s.sliderWrap}>
                    <Swiper
                        className={s.slider}
                        modules={[Navigation]}
                        navigation={{
                            nextEl: `.${s.btn_next}`,
                            prevEl: `.${s.btn_prev}`,
                            lockClass: `${s.btn_hidden}`,
                        }}
                        slidesPerView={1}
                        spaceBetween={10}
                        speed={500}
                        breakpoints={{
                            420: {
                                slidesPerView: 2,
                            },
                            768: {
                                spaceBetween: 20,
                                slidesPerView: 3,
                            },
                            1080: {
                                slidesPerView: 4,
                            },
                        }}
                    >
                        {productsEls}
                    </Swiper>
                    <div className={s.nav}>
                        <SliderButton type='prev' ClName={`${s.btn} ${s.btn_prev}`} />
                        <SliderButton type='next' ClName={`${s.btn} ${s.btn_next}`} />
                    </div>
                </div>
            </div>
            <div className={s.bg}>
                <Image src='/images/mainPage/bg2.png' alt='' objectFit='cover' />
            </div>
        </div>
    )
}
