import s from './Slider.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Navigation, Thumbs, Controller } from 'swiper'
import 'swiper/css'
import { useEffect, useState } from 'react'
import { Video } from '~/modules/shared/components/Video/Video'
import { SliderButton } from '~/modules/shared/components/SliderButton/SliderButton'
import { usePopup } from '~/modules/shared/hooks/usePopup'
import { Popup } from '~/modules/shared/components/Popup/Popup'
import { ImageFill } from '~/modules/shared/components/Image/Image'

export interface SliderProps {
    imagesSrc?: string[]
    videosSrc?: string[]
}

SwiperCore.use([Autoplay])

export const Slider = ({ imagesSrc, videosSrc }: SliderProps) => {
    const [firstSwiper, setFirstSwiper] = useState(null as null | SwiperCore)
    const [secondSwiper, setSecondSwiper] = useState(null as null | SwiperCore)
    const [thumbsSwiper, setThumbsSwiper] = useState(null as null | SwiperCore)

    const [activeSlideId, setActiveSlideId] = useState(0)
    const [isPopupActive, activatePopup, deactivatePopup] = usePopup()

    const mainSliderEls: JSX.Element[] = []
    const thumbsSliderEls: JSX.Element[] = []
    const popupSliderElements: JSX.Element[] = []

    if (videosSrc) {
        videosSrc.forEach((src, id) => {
            mainSliderEls.push(
                <SwiperSlide onClick={activatePopup} className={s.slide} key={`${src}_${id}`}>
                    <ImageFill
                        src={`https://img.youtube.com/vi/${src}/maxresdefault.jpg`}
                        srcRes={`https://img.youtube.com/vi/${src}/hqdefault.jpg`}
                        objectFit='cover'
                        orientation='16/9'
                    />
                </SwiperSlide>,
            )
            thumbsSliderEls.push(
                <SwiperSlide
                    className={`${s.thumb} ${activeSlideId === id ? s.thumb_active : ''}`}
                    key={`${src}_${id}`}
                >
                    <ImageFill
                        src={`https://img.youtube.com/vi/${src}/mqdefault.jpg`}
                        objectFit='cover'
                        orientation='16/9'
                    />
                </SwiperSlide>,
            )
            popupSliderElements.push(
                <SwiperSlide className={s.slide} key={`${src}_${id}`}>
                    <Video id={src} isActive={activeSlideId === id && isPopupActive} />
                </SwiperSlide>,
            )
        })
    }

    if (imagesSrc) {
        imagesSrc.forEach((src, id) => {
            const idWithVideos = videosSrc ? id + videosSrc.length : id

            mainSliderEls.push(
                <SwiperSlide
                    onClick={activatePopup}
                    className={s.slide}
                    key={`${src}_${idWithVideos}`}
                >
                    <ImageFill src={src} objectFit='cover' orientation='16/9' />
                </SwiperSlide>,
            )
            thumbsSliderEls.push(
                <SwiperSlide
                    className={`${s.thumb} ${activeSlideId === idWithVideos ? s.thumb_active : ''}`}
                    key={`${src}_${idWithVideos}`}
                >
                    <ImageFill src={src} objectFit='cover' orientation='16/9' />
                </SwiperSlide>,
            )
            popupSliderElements.push(
                <SwiperSlide className={s.slide} key={`${src}_${idWithVideos}`}>
                    <ImageFill src={src} objectFit='cover' orientation='16/9' />
                </SwiperSlide>,
            )
        })
    }

    useEffect(() => {
        const autoplay = firstSwiper?.autoplay

        if (isPopupActive && autoplay?.running) autoplay.stop()
        if (!isPopupActive && autoplay && !autoplay.running) autoplay?.start()
    }, [isPopupActive, firstSwiper?.autoplay])

    useEffect(() => {
        secondSwiper?.slideTo(activeSlideId)
    }, [activeSlideId])

    // render

    return (
        <div className={s.wrap}>
            <>
                <div className={s.sliderWrap}>
                    <Swiper
                        className={s.slider}
                        modules={[Navigation, Thumbs, Controller]}
                        thumbs={{
                            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                            slideThumbActiveClass: s.thumb_active,
                        }}
                        navigation={{
                            nextEl: `.${s.btnNext}`,
                            prevEl: `.${s.btnPrev}`,
                        }}
                        // loop
                        slidesPerView={1}
                        spaceBetween={50}
                        speed={1000}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: true,
                            pauseOnMouseEnter: true,
                        }}
                        onSlideChange={({ realIndex }) => {
                            setActiveSlideId(realIndex)
                        }}
                        // controller
                        onSwiper={setFirstSwiper}
                        // controller={{
                        //     control:
                        //         secondSwiper && !secondSwiper.destroyed ? secondSwiper : undefined,
                        // }}
                    >
                        {mainSliderEls}
                    </Swiper>
                    <div className={s.nav}>
                        <SliderButton type='prev' ClName={s.btnPrev} />
                        <SliderButton type='next' ClName={s.btnNext} />
                    </div>
                </div>

                <Swiper
                    className={s.thumbs}
                    modules={[Navigation, Thumbs]}
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    watchSlidesProgress={true}
                >
                    {thumbsSliderEls}
                </Swiper>

                <Popup isPopupActive={isPopupActive} deactivatePopup={deactivatePopup}>
                    <div>
                        <div className={s.popup}>
                            <Swiper
                                className={`${s.slider} ${s.slider_popup}`}
                                modules={[Navigation, Thumbs, Controller]}
                                navigation={{
                                    nextEl: `.${s.btnNext_2}`,
                                    prevEl: `.${s.btnPrev_2}`,
                                }}
                                // loop

                                slidesPerView={1}
                                spaceBetween={50}
                                speed={1500}
                                onSlideChange={({ realIndex }) => {
                                    setActiveSlideId(realIndex)
                                }}
                                // controller
                                onSwiper={setSecondSwiper}
                                // controller={{
                                //     control:
                                //         firstSwiper && !firstSwiper.destroyed
                                //             ? firstSwiper
                                //             : undefined,
                                // }}
                            >
                                {popupSliderElements}
                            </Swiper>
                            <div className={`${s.nav} ${s.nav_popup}`}>
                                <SliderButton type='prev' ClName={s.btnPrev_2} />
                                <SliderButton type='next' ClName={s.btnNext_2} />
                            </div>
                        </div>
                    </div>
                </Popup>
            </>
        </div>
    )
}
