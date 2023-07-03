import { type RefObject, useEffect } from 'react'

interface UseHandleClickOutsideProps {
    elementRef?: RefObject<HTMLDivElement>
    onClickOutside: () => void
    shouldBeListening: boolean
}

export const useHandleClickOutside = ({
    elementRef,
    onClickOutside,
    shouldBeListening,
}: UseHandleClickOutsideProps) => {
    const handleClick = (e: globalThis.MouseEvent) => {
        if (!(e.target instanceof HTMLElement) || !shouldBeListening || !elementRef?.current) return

        if (!elementRef.current.contains(e.target)) onClickOutside()
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])
}
