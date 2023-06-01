import { useEffect, useRef, useState } from 'react'

export const useStatusPopup = () => {
    const [isPopupActive, setIsPopupActive] = useState(false)

    const ref = useRef<HTMLDivElement>(null)

    const handleClick = (e: globalThis.MouseEvent) => {
        if (!(e.target instanceof Element)) return

        if (!ref.current?.contains(e.target)) setIsPopupActive(false)
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    return {
        wrapRef: ref,
        isPopupActive,
        setIsPopupActive,
    }
}
