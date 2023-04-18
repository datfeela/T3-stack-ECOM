import debounce from 'lodash.debounce'
import { useState } from 'react'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

export const useWindowSize = () => {
    const useEffect = useIsomorphicLayoutEffect()

    const [size, setSize] = useState({ width: 0, height: 0 })

    useEffect(() => {
        const updateSize = debounce(() => {
            setSize({ width: window.innerWidth, height: window.innerHeight })
        }, 150)

        window.addEventListener('resize', updateSize)
        updateSize()
        return () => window.removeEventListener('resize', updateSize)
    }, [])
    return size
}
