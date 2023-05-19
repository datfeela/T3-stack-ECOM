import { useEffect, useRef, useState } from 'react'

interface UseScrollToHeaderProps {
    shouldScroll: boolean
    behavior?: ScrollBehavior | undefined
    scrollTo?: ScrollLogicalPosition
}

export const useScrollToElement = ({
    shouldScroll,
    behavior,
    scrollTo,
}: UseScrollToHeaderProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        if (!shouldScroll || !ref || isScrolled) return
        ref.current?.scrollIntoView({ behavior, block: scrollTo })
        setIsScrolled(true)
    }, [shouldScroll, ref])

    return ref
}
