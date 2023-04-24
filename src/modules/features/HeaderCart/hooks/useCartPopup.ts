import { useEffect, useState } from 'react'

interface UseCartPopupProps {
    containerClassName: string
}

export const useCartPopup = ({ containerClassName }: UseCartPopupProps) => {
    const [isCartActive, setIsCartActive] = useState(false)

    const deactivatePopup = () => {
        setIsCartActive(false)
    }

    const handleClick = (e: globalThis.MouseEvent) => {
        if (!(e.target instanceof HTMLElement)) return

        if (!e.target.closest(containerClassName)) {
            console.log(e.target)

            deactivatePopup()
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    return { isCartActive, setIsCartActive }
}
