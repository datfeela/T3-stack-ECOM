import type SwiperCore from 'swiper'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useReinitSlider = (slider: SwiperCore | null) => {
    const router = useRouter()

    useEffect(() => {
        slider?.slideTo(0)
    }, [router.query.pid])
}
