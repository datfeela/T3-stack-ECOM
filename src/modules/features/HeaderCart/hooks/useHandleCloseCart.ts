import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

interface UseHandleCloseCartProps {
    closeCart: () => void
}

export const useHandleCloseCart = ({ closeCart }: UseHandleCloseCartProps) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (!(e.target instanceof Element)) return

            if (!ref.current?.contains(e.target)) closeCart()
        })
    }, [])

    const router = useRouter()

    useEffect(() => {
        closeCart()
    }, [router.asPath])

    return ref
}
