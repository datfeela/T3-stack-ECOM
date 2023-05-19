import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useScrollProductToTop = () => {
    const router = useRouter()
    const commentsReviewMode = Boolean(router.query.reviewsMode)
    const recommendedGamesMode = Boolean(router.query.recommendedGamesMode)

    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [])

    useEffect(() => {
        if (commentsReviewMode || recommendedGamesMode) return
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        })
    }, [router.query])
}
