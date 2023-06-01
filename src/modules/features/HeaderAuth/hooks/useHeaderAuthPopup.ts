import { useEffect, useState } from 'react'

interface UseHeaderAuthPopupProps {
    containerClassName: string
}

export const useHeaderAuthPopup = ({ containerClassName }: UseHeaderAuthPopupProps) => {
    const [isPopupActive, setIsPopupActive] = useState(false)

    const deactivatePopup = () => {
        setIsPopupActive(false)
    }

    const handleClick = (e: globalThis.MouseEvent) => {
        if (!(e.target instanceof HTMLElement)) return

        if (!e.target.closest(containerClassName) && isPopupActive) {
            deactivatePopup()
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    return { isPopupActive, setIsPopupActive }
}
