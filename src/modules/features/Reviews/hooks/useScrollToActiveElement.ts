import { useEffect, useRef, useState } from 'react'

export const useScrollToActiveElement = ({ shouldScroll }: { shouldScroll: boolean }) => {
    const activeElementRef = useRef<HTMLDivElement>(null)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        if (!shouldScroll || !activeElementRef || isScrolled) return
        activeElementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        setIsScrolled(true)
    }, [shouldScroll, activeElementRef])

    return activeElementRef
}
