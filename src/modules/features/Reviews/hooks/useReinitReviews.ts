import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useReinitReviews = (onPidChange: () => void) => {
    const router = useRouter()

    useEffect(() => {
        onPidChange()
    }, [router.query.pid])
}
