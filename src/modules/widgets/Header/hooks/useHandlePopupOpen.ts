import { useEffect } from 'react'
import { useBodyNoScroll } from '~/modules/shared/hooks/useBodyNoScroll'

interface UseHandlePopupOpenProps {
    isPopupActive: boolean
    searchQuery: string
    activatePopup: () => void
}

export const useHandlePopupOpen = ({
    searchQuery,
    isPopupActive,
    activatePopup,
}: UseHandlePopupOpenProps) => {
    useEffect(() => {
        if (!isPopupActive && searchQuery.length > 0) activatePopup()
    }, [searchQuery])

    useBodyNoScroll(isPopupActive)
}
