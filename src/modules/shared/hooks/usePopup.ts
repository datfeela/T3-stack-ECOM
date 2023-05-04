import { useState } from 'react'

export const usePopup = () => {
    const [isPopupActive, setIsPopupActive] = useState(false)

    const activatePopup = () => {
        setIsPopupActive(true)
    }

    const deactivatePopup = () => {
        setIsPopupActive(false)
    }

    return { isPopupActive, activatePopup, deactivatePopup } as const
}
