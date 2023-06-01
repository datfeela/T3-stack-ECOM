import { useState } from 'react'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

interface MatchedMedia {
    isLess480: boolean
    isMore480: boolean
    isMore768: boolean
    isMore960: boolean
    isMore1200: boolean
    isMore1440: boolean
}

const queries = [
    '(max-width: 480px)',
    '(min-width: 481px) and (max-width: 768px)',
    '(min-width: 769px) and (max-width: 960px)',
    '(min-width: 961px) and (max-width: 1200px)',
    '(min-width: 1201px) and (max-width: 1440px)',
    '(min-width: 1441px)',
]

export const useMatchMedia = () => {
    const [values, setValues] = useState([false])

    const typeofWindow = typeof window

    const mediaQueryLists =
        typeofWindow !== 'undefined' ? queries.map((query) => matchMedia(query)) : undefined
    const getValues =
        typeofWindow !== 'undefined'
            ? () => {
                  return mediaQueryLists!.map((list) => list.matches)
              }
            : undefined

    const useEffect = useIsomorphicLayoutEffect()

    useEffect(() => {
        const handler = () => {
            setValues(getValues ? getValues() : [false])
        }
        handler()

        mediaQueryLists?.forEach((list) => list.addEventListener('change', handler))

        return () => {
            mediaQueryLists?.forEach((list) => list.removeEventListener('change', handler))
        }
    }, [])

    if (typeofWindow === 'undefined' || values.length < 2) return

    return ['isLess480', 'isMore480', 'isMore768', 'isMore960', 'isMore1200', 'isMore1440'].reduce(
        (acc, item, id) => ({ ...acc, [item]: values[id] }),
        {},
    ) as MatchedMedia
}
