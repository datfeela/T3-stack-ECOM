import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

interface UseHandleCloseHeaderPopupProps {
    close: () => void
}

export const useHandleCloseHeaderPopup = ({ close }: UseHandleCloseHeaderPopupProps) => {
    const wrapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (!(e.target instanceof Element)) return

            if (!wrapRef.current?.contains(e.target)) close()
        })
    }, [])

    const router = useRouter()

    useEffect(() => {
        close()
    }, [router.asPath])

    return wrapRef
}
