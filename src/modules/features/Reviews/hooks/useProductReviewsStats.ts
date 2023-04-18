import { useEffect, useState } from 'react'
import { api } from '~/modules/shared/api/apiTRPC'

interface UseProductReviewsStatsProps {
    productId: string
    positiveScoresCount: number
    negativeScoresCount: number
}

export const useProductReviewsStats = ({
    productId,
    positiveScoresCount,
    negativeScoresCount,
}: UseProductReviewsStatsProps) => {
    const [scoresCount, setScoresCount] = useState(positiveScoresCount + negativeScoresCount)
    const [percentUsersRecommend, setPercentUsersRecommend] = useState(
        Math.round((positiveScoresCount / scoresCount) * 100),
    )

    const productReviewsStats = api.products.getProductReviewsStats.useQuery({ id: productId }).data

    useEffect(() => {
        if (!productReviewsStats) return

        const scoresCountFromApi =
            productReviewsStats.positiveScoresCount + productReviewsStats.negativeScoresCount
        if (scoresCountFromApi !== scoresCount) setScoresCount(scoresCountFromApi)

        const percentUsersRecommendFromApi = Math.round(
            (productReviewsStats.positiveScoresCount / scoresCountFromApi) * 100,
        )

        if (percentUsersRecommendFromApi !== percentUsersRecommend)
            setPercentUsersRecommend(percentUsersRecommendFromApi)
    }, [productReviewsStats])

    return { scoresCount, percentUsersRecommend }
}
