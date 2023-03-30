import debounce from 'lodash.debounce'
import { useLayoutEffect, useState } from 'react'

export const useWindowSize = () => {
    const [size, setSize] = useState({ width: 0, height: 0 })
    useLayoutEffect(() => {
        const updateSize = debounce(() => {
            setSize({ width: window.innerWidth, height: window.innerHeight })
        }, 150)

        window.addEventListener('resize', updateSize)
        updateSize()
        return () => window.removeEventListener('resize', updateSize)
    }, [])
    return size
}
