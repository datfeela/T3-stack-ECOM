import { useEffect, useState } from 'react'

export const useDebouncedValue = <T>(value: T, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    const [isDebouncing, setIsDebouncing] = useState(false)

    useEffect(() => {
        if (value && !isDebouncing) setIsDebouncing(true)

        const handler = setTimeout(() => {
            setIsDebouncing(false)

            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value])

    return { value: debouncedValue, isDebouncing }
}
