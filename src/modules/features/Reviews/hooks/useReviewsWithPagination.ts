import { ProductReview, User } from '@prisma/client'
import { useEffect, useState } from 'react'
import { api } from '~/modules/shared/api/apiTRPC'

interface Props {
    productId: string
    reviewsToGetQuantity: number
    totalReviewsCount: number
    isUsingPagination: boolean
}

export const useReviewsWithPagination = ({ productId, reviewsToGetQuantity }: Props) => {
    const res = api.products.getProductReviewsById.useInfiniteQuery(
        {
            id: productId,
            quantity: reviewsToGetQuantity,
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        },
    )

    const { data, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = res

    let reviews = undefined as
        | (ProductReview & {
              User: User | null
          })[]
        | undefined

    data?.pages.forEach((item) => {
        if (!reviews) reviews = [...item.items]
        else reviews = [...reviews, ...item.items]
    })

    return {
        reviews,
        getNextPage: fetchNextPage,
        isAllReviewsLoaded: !hasNextPage,
        isSuccess,
        isLoading: isFetchingNextPage || isLoading,
    }
}
