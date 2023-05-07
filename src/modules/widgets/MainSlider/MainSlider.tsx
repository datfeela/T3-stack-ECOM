import s from './MainSlider.module.scss'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Navigation, Pagination, Thumbs } from 'swiper'

import { Slide } from './components/Slide/Slide'
import { SliderButton } from '~/modules/shared/components/SliderButton/SliderButton'
import 'swiper/css'
import { useState } from 'react'
import type { MainPageProductFromApi } from '~/modules/entities/product'

SwiperCore.use([Autoplay])

export const MainSlider = ({ productsData }: { productsData: MainPageProductFromApi[] }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null as null | SwiperCore)
    const [activeSlideId, setActiveSlideId] = useState(0)

    const productsEls = productsData?.map((product, id) => (
        <SwiperSlide className={s.slide} key={id}>
            <Slide productData={product} />
        </SwiperSlide>
    ))

    return (
        <div className={s.wrap}>
            <Swiper
                className={s.slider}
                modules={[Navigation, Pagination, Thumbs]}
                navigation={{
                    nextEl: `.${s.btnNext}`,
                    prevEl: `.${s.btnPrev}`,
                }}
                pagination={{
                    el: `.${s.pagination__value}`,
                    type: 'fraction',
                }}
                thumbs={{
                    swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                    slideThumbActiveClass: s.thumb_active,
                }}
                onSlideChange={({ realIndex }) => {
                    setActiveSlideId(realIndex)
                }}
                slidesPerView={1}
                spaceBetween={50}
                speed={1000}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true,
                }}
                grabCursor
            >
                {productsEls}
            </Swiper>
            <div className={s.nav}>
                <SliderButton type='prev' ClName={s.btnPrev} />
                <SliderButton type='next' ClName={s.btnNext} />
            </div>
            <div className={s.paginationWrap}>
                <div className={s.pagination}>
                    <div />
                    <span className={s.pagination__value} />
                    <div />
                </div>
            </div>
            <Swiper
                className={s.thumbs}
                modules={[Navigation, Thumbs]}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={20}
                watchSlidesProgress={true}
            >
                {productsData?.map((_, id) => (
                    <SwiperSlide
                        className={`${s.thumb} ${activeSlideId === id ? s.thumb_active : ''}`}
                        key={id}
                    />
                ))}
            </Swiper>
        </div>
    )
}
