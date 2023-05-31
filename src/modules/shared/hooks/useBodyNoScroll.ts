import { useEffect } from 'react'

export const useBodyNoScroll = (shouldBeNoScroll: boolean) => {
    useEffect(() => {
        if (!document) return
        const bodyRef = document.querySelector('html')
        if (!bodyRef) return

        if (
            shouldBeNoScroll &&
            !bodyRef.classList.contains('isClosing') &&
            !bodyRef.classList.contains('isOpening')
        ) {
            bodyRef.classList.add('isOpening')
        }
        if (
            !shouldBeNoScroll &&
            !bodyRef.classList.contains('isClosing') &&
            !bodyRef.classList.contains('isOpening')
        ) {
            bodyRef.classList.add('isClosing')
        }

        setTimeout(() => {
            if (
                bodyRef.classList.contains('isOpening') &&
                bodyRef.classList.contains('isClosing')
            ) {
                bodyRef.classList.add('no-scroll')
                bodyRef.classList.remove('isClosing')
                bodyRef.classList.remove('isOpening')
            }

            if (bodyRef.classList.contains('isClosing')) {
                bodyRef.classList.remove('no-scroll')
                bodyRef.classList.remove('isClosing')
            }

            if (bodyRef.classList.contains('isOpening')) {
                bodyRef.classList.add('no-scroll')
                bodyRef.classList.remove('isOpening')
            }
        }, 100)
    }, [shouldBeNoScroll])
}
