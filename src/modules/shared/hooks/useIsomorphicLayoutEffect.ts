import { useEffect, useLayoutEffect } from 'react'

export const useIsomorphicLayoutEffect = () => {
    return typeof window !== 'undefined' ? useLayoutEffect : useEffect
}
