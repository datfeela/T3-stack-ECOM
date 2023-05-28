import { useEffect } from 'react'
import { useMatchMedia } from './useMatchMedia'

export const useBodyNoScroll = (shouldBeNoScroll: boolean) => {
    const matchMedia = useMatchMedia()

    useEffect(() => {
        if (!document) return
        const bodyRef = document.querySelector('html')
        if (!bodyRef) return

        if (
            bodyRef.classList.contains('no-scroll') &&
            matchMedia &&
            (matchMedia.isMore960 || matchMedia.isMore1200 || matchMedia.isMore1440)
        )
            bodyRef.classList.remove('no-scroll')

        if (
            shouldBeNoScroll &&
            !bodyRef.classList.contains('no-scroll') &&
            matchMedia &&
            !(matchMedia.isMore960 || matchMedia.isMore1200 || matchMedia.isMore1440)
        )
            bodyRef.classList.add('no-scroll')
    }, [matchMedia])

    useEffect(() => {
        if (!document) return
        const bodyRef = document.querySelector('html')
        if (!bodyRef) return

        if (shouldBeNoScroll) {
            bodyRef.classList.add('isOpening')
        }
        if (!shouldBeNoScroll) {
            bodyRef.classList.add('isClosing')
        }

        setTimeout(() => {
            if (
                bodyRef.classList.contains('isOpening') &&
                bodyRef.classList.contains('isClosing')
            ) {
                console.log('openclose')
                bodyRef.classList.add('no-scroll')
                bodyRef.classList.remove('isClosing')
                bodyRef.classList.remove('isOpening')
            }

            if (bodyRef.classList.contains('isClosing')) {
                console.log('close')
                bodyRef.classList.remove('no-scroll')
                bodyRef.classList.remove('isClosing')
            }

            if (bodyRef.classList.contains('isOpening')) {
                console.log('open')
                bodyRef.classList.add('no-scroll')
                bodyRef.classList.remove('isOpening')
            }
        }, 100)
    }, [shouldBeNoScroll])
}
