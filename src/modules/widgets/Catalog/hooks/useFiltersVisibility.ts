import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useBodyNoScroll } from '~/modules/shared/hooks/useBodyNoScroll'
import { useMatchMedia } from '~/modules/shared/hooks/useMatchMedia'

export const useFiltersVisibility = () => {
    const matchMedia = useMatchMedia()
    const router = useRouter()

    const [isFiltersVisible, setIsFiltersVisible] = useState(false)
    const toggleFiltersDisplay = () => {
        setIsFiltersVisible(!isFiltersVisible)

        if (!!isFiltersVisible && router.asPath.indexOf('#filters') !== -1) {
            const url = router.asPath.split('#filters')[0]
            if (!!url) router.push(url, undefined, { shallow: true })
        }

        if (!isFiltersVisible && router.asPath.indexOf('#filters') === -1) {
            router.push(`${router.asPath}#filters`, undefined, { shallow: true })
        }
    }

    useEffect(() => {
        if (router.asPath.indexOf('#filters') === -1 && !!isFiltersVisible)
            setIsFiltersVisible(false)

        if (router.asPath.indexOf('#filters') !== -1 && !isFiltersVisible) setIsFiltersVisible(true)
    }, [router.asPath])

    const shouldBeNoScroll =
        !!isFiltersVisible && !!matchMedia && (matchMedia.isLess480 || matchMedia.isMore480)

    useBodyNoScroll(shouldBeNoScroll)

    return { isFiltersVisible, toggleFiltersDisplay }
}
