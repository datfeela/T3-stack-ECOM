import { useCallback, useRef } from 'react'

interface UseInfiniteScrollProps {
    getMore: () => void
    shouldGetMore: boolean
    observerOptions?: IntersectionObserverInit
}

export const useInfiniteScroll = ({
    shouldGetMore,
    getMore,
    observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    },
}: UseInfiniteScrollProps) => {
    const observer = useRef<IntersectionObserver | null>(null)

    const anchorEl = useCallback(
        (node: HTMLDivElement | null) => {
            if (!node) return
            if (!shouldGetMore) return

            if (observer.current) observer.current.disconnect()

            observer.current = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return

                    getMore()
                    observer.disconnect()
                })
            }, observerOptions)

            observer.current.observe(node)
        },
        [shouldGetMore],
    )

    return anchorEl
}
