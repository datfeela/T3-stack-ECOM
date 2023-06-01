import { useEffect, useRef, useState } from 'react'

export const useScrollContainerInView = ({ shouldScroll }: { shouldScroll: boolean }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        if (!shouldScroll || !ref || isScrolled) return
        ref.current?.scrollIntoView({ behavior: 'smooth' })
        setIsScrolled(true)
    }, [shouldScroll, ref])

    return ref
}
