import debounce from 'lodash.debounce'
import { type RefObject, useLayoutEffect, useState } from 'react'
import { isWrapHigherThanChildrenElements } from '~/modules/shared/lib/isWrapHigherThanChildrenElements'

export const useIsWrapHigherThanContent = (wrapperRef: RefObject<HTMLElement>) => {
    const [isWrapHigherThanContent, setIsWrapHigherThanContent] = useState(false)

    const updateIsWrapHigherThanContent = () => {
        if (!wrapperRef.current) return

        const isWrapHigher = isWrapHigherThanChildrenElements({
            wrapEl: wrapperRef.current,
            children: wrapperRef.current?.children,
        })

        setIsWrapHigherThanContent(isWrapHigher)
    }

    useLayoutEffect(() => {
        updateIsWrapHigherThanContent()

        const debouncedUpdater = debounce(updateIsWrapHigherThanContent, 350)

        window.addEventListener('resize', debouncedUpdater)
        return () => {
            window.removeEventListener('resize', debouncedUpdater)
        }
    })

    return isWrapHigherThanContent
}
