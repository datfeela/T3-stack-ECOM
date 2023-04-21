import { ProductCard } from '~/modules/shared/components/ProductCard/ProductCard'
import { useRecommendedProducts } from '../../hooks/useRecommendedProducts'
import s from './RecommendedGames.module.scss'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import { SliderButton } from '~/modules/shared/components/SliderButton/SliderButton'
import Link from 'next/link'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'

interface RecommendedGamesProps {
    productId: string
    productName: string
    expandedMode?: boolean
}

export const RecommendedGames = ({
    productId,
    productName,
    expandedMode = false,
}: RecommendedGamesProps) => {
    const products = useRecommendedProducts(productId)

    const productsElements = products.map((product, id) => {
        if (expandedMode)
            return (
                <ProductCard
                    {...product}
                    imageSizes='(max-width: 1200px) 550px, 400px'
                    linkBasePathName='/game'
                    view='default'
                />
            )

        if (!expandedMode)
            return (
                <SwiperSlide className={s.slide} key={id}>
                    <ProductCard
                        {...product}
                        imageSizes='(max-width: 1200px) 550px, 400px'
                        linkBasePathName='/game'
                        view='default'
                    />
                </SwiperSlide>
            )
    })

    return (
        <div className='wrap'>
            <div className={s.header}>
                <h2>{expandedMode ? `Games similar to ${productName}` : 'You may also like'}</h2>
                {!expandedMode ? (
                    <Link
                        href={`/game/${productId}?recommendedGamesMode=true`}
                        className={s.expandBtn}
                    >
                        <span>See all</span>
                        <div className={s.expandBtn__icon}>
                            <SvgSelector id='arrowDefault' />
                        </div>
                    </Link>
                ) : null}
            </div>
            {expandedMode ? (
                <div className={s.productsGrid}>{productsElements}</div>
            ) : (
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
                            600: {
                                slidesPerView: 2,
                            },
                            1200: {
                                slidesPerView: 3,
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
            )}
        </div>
    )
}
