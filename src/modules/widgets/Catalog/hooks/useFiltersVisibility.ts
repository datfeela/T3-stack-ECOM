import { useState } from 'react'
import { useBodyNoScroll } from '~/modules/shared/hooks/useBodyNoScroll'
import { useMatchMedia } from '~/modules/shared/hooks/useMatchMedia'

export const useFiltersVisibility = () => {
    const matchMedia = useMatchMedia()

    const [isFiltersVisible, setIsFiltersVisible] = useState(false)
    const toggleFiltersDisplay = () => {
        setIsFiltersVisible(!isFiltersVisible)
    }

    const shouldBeNoScroll =
        !!isFiltersVisible && !!matchMedia && (matchMedia.isLess480 || matchMedia.isMore480)

    useBodyNoScroll(shouldBeNoScroll)

    return { isFiltersVisible, setIsFiltersVisible, toggleFiltersDisplay }
}
