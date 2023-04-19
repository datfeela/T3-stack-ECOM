import debounce from 'lodash.debounce'
import { type RefObject, useState } from 'react'
import { useIsomorphicLayoutEffect } from '~/modules/shared/hooks/useIsomorphicLayoutEffect'
import { isWrapHigherThanChildrenElements } from '~/modules/shared/lib/isWrapHigherThanChildrenElements'

export const useIsWrapHigherThanContent = (wrapperRef: RefObject<HTMLElement>) => {
    const useEffect = useIsomorphicLayoutEffect()
    const [isWrapHigherThanContent, setIsWrapHigherThanContent] = useState(false)

    const updateIsWrapHigherThanContent = () => {
        if (!wrapperRef.current) return

        const isWrapHigher = isWrapHigherThanChildrenElements({
            wrapEl: wrapperRef.current,
            children: wrapperRef.current?.children,
        })

        setIsWrapHigherThanContent(isWrapHigher)
    }

    useEffect(() => {
        updateIsWrapHigherThanContent()

        const debouncedUpdater = debounce(updateIsWrapHigherThanContent, 350)

        window.addEventListener('resize', debouncedUpdater)
        return () => {
            window.removeEventListener('resize', debouncedUpdater)
        }
    })

    return isWrapHigherThanContent
}
