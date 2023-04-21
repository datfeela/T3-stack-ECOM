import { ProductCard } from '~/modules/shared/components/ProductCard/ProductCard'
import s from './RelatedGames.module.scss'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import { SliderButton } from '~/modules/shared/components/SliderButton/SliderButton'
import { useRelatedProducts } from '../../hooks/useRelatedProducts'

interface RelatedGamesProps {
    productId: string
    originalGameId: string | null
    relatedGamesIds: string[] | undefined
}

export const RelatedGames = ({ productId, originalGameId, relatedGamesIds }: RelatedGamesProps) => {
    const products = useRelatedProducts({ productId, originalGameId, relatedGamesIds })

    const productsElements = products?.map((product, id) => (
        <SwiperSlide className={s.slide} key={id}>
            <ProductCard
                {...product}
                imageSizes='(max-width: 1000px) 450px, 320px'
                linkBasePathName='/game'
                view='horizontal'
            />
        </SwiperSlide>
    ))

    if (!productsElements || productsElements.length === 0) return null

    return (
        <div className='wrap'>
            <h2>Editions & DLCs</h2>
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
                    speed={1000}
                    breakpoints={{
                        1000: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {productsElements}
                </Swiper>
                <div className={s.nav}>
                    <SliderButton type='prev' ClName={`${s.btn} ${s.btn_prev}`} />
                    <SliderButton type='next' ClName={`${s.btn} ${s.btn_next}`} />
                </div>
            </div>
        </div>
    )
}
