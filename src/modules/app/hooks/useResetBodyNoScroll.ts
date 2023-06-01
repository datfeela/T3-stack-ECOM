import { useEffect, useState } from 'react'
import { useMatchMedia } from '~/modules/shared/hooks/useMatchMedia'

export const useResetBodyNoScroll = () => {
    const matchMedia = useMatchMedia()
    const [isDesktop, setIsDesktop] = useState(
        !!matchMedia
            ? matchMedia.isMore960 || matchMedia.isMore1200 || matchMedia.isMore1440
            : false,
    )

    useEffect(() => {
        if (
            !!matchMedia &&
            isDesktop !== (matchMedia.isMore960 || matchMedia.isMore1200 || matchMedia.isMore1440)
        )
            setIsDesktop(matchMedia.isMore960 || matchMedia.isMore1200 || matchMedia.isMore1440)
    }, [matchMedia])

    useEffect(() => {
        if (!matchMedia || !document) return
        const bodyRef = document.querySelector('html')
        if (!bodyRef) return

        if (
            !bodyRef.classList.contains('isClosing') &&
            !bodyRef.classList.contains('isOpening') &&
            bodyRef.classList.contains('no-scroll')
        )
            bodyRef.classList.remove('no-scroll')
    }, [isDesktop])
}
