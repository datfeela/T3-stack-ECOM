import throttle from 'lodash.throttle'
import { useEffect, useState } from 'react'

export const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0)

    const handleScroll = throttle(() => {
        const position = window.pageYOffset
        setScrollPosition(position)
    }, 250)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return scrollPosition
}
