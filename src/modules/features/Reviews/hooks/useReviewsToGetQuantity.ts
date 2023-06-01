import { useMatchMedia } from '~/modules/shared/hooks/useMatchMedia'

export const useReviewsToGetQuantity = (expandedMode: boolean) => {
    const matchMedia = useMatchMedia()
    // get reviews
    let reviewsToGetQuantity = 3
    if (!matchMedia || matchMedia.isMore1200 || matchMedia.isMore1440) reviewsToGetQuantity = 4
    if (expandedMode) reviewsToGetQuantity = 5

    return reviewsToGetQuantity
}
