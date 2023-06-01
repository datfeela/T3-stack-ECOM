import s from './Reviews.module.scss'
import { Review } from './components/Review/Review'
import { parseDateToString } from '~/modules/shared/lib/parseDateToString'
import { useReviewsWithPagination } from './hooks/useReviewsWithPagination'
import { useReviewsToGetQuantity } from './hooks/useReviewsToGetQuantity'
import { LoaderFullScreen } from '~/modules/shared/components/Loaders/Loaders'
import { useScrollToActiveElement } from './hooks/useScrollToActiveElement'
import { Header } from './components/Header/Header'
import { AddReviewForm } from './components/AddReviewForm/AddReviewForm'
import { useState } from 'react'
import { useProductReviewsStats } from './hooks/useProductReviewsStats'
import { AddReviewButton } from './components/AddReviewButton/AddReviewButton'
import { useScrollToElement } from '~/modules/shared/hooks/useScrollToElement'
import { useReinitReviews } from './hooks/useReinitReviews'

interface reviewsProps {
    productName: string
    productId: string
    negativeScoresCount: number
    positiveScoresCount: number
    expandedMode?: boolean
    activeCommentId?: string
}

export const Reviews = ({
    productName,
    activeCommentId,
    negativeScoresCount,
    positiveScoresCount,
    productId,
    expandedMode = false,
}: reviewsProps) => {
    const [isAddFormActive, setIsAddFormActive] = useState(false)
    // initial values

    useReinitReviews(() => {
        setIsAddFormActive(false)
    })

    const { scoresCount, percentUsersRecommend } = useProductReviewsStats({
        productId,
        negativeScoresCount,
        positiveScoresCount,
    })

    const reviewsToGetQuantity = useReviewsToGetQuantity(expandedMode)
    const { reviews, isAllReviewsLoaded, isLoading, isSuccess, getNextPage } =
        useReviewsWithPagination({
            productId,
            reviewsToGetQuantity,
        })

    // scroll to active element on mount, or to container, if there's no active el
    const activeElementRef = useScrollToActiveElement({ shouldScroll: !!reviews })
    const containerRef = useScrollToElement({
        shouldScroll: !activeCommentId && expandedMode && !!reviews,
        behavior: 'smooth',
    })

    // render
    const reviewEls =
        reviews && reviews.length > 0
            ? reviews.map(({ User, message, rating, id, date }) => {
                  const ratingTyped = rating as 0 | 1
                  const isElActive = id === activeCommentId

                  return (
                      <div
                          key={id}
                          ref={isElActive && activeElementRef ? activeElementRef : undefined}
                      >
                          <Review
                              productId={productId}
                              id={id}
                              userName={User?.name}
                              userImgSrc={User?.image}
                              message={message}
                              rating={ratingTyped}
                              date={parseDateToString(date)}
                              expandedMode={expandedMode}
                              isActive={isElActive}
                          />
                      </div>
                  )
              })
            : null

    return (
        <div ref={containerRef} className='wrap'>
            <Header
                expandedMode={expandedMode}
                percentUsersRecommend={percentUsersRecommend}
                productId={productId}
                productName={productName}
                scoresCount={scoresCount}
                isAddFormActive={isAddFormActive}
                setIsAddFormActive={setIsAddFormActive}
                reviewsVisibleQuantity={reviewsToGetQuantity}
            />
            <AddReviewForm
                isActive={isAddFormActive}
                productId={productId}
                quantityToGetOnSuccess={reviewsToGetQuantity}
                onSubmit={() => {
                    setIsAddFormActive(false)
                }}
            />
            {reviews?.length === 0 && !expandedMode && !isAddFormActive ? (
                <div className={s.placeholderText}>There are no reviews yet...</div>
            ) : null}
            {!expandedMode ? (
                <AddReviewButton
                    isAddFormActive={isAddFormActive}
                    setIsAddFormActive={setIsAddFormActive}
                />
            ) : null}
            <div className={`${s.reviews} ${expandedMode ? s.reviews_expandedMode : ''}`}>
                {reviews && isSuccess ? (
                    <>
                        {reviews.length > 0 ? reviewEls : null}
                        {expandedMode && !isAllReviewsLoaded && !isLoading ? (
                            <button
                                onClick={async () => {
                                    await getNextPage()
                                }}
                                type='button'
                                className={s.loadMoreBtn}
                            >
                                More reviews
                            </button>
                        ) : null}
                    </>
                ) : null}
                {!reviews || isLoading ? (
                    <div className={s.reviews__placeholder}>
                        <LoaderFullScreen type='dots' />
                    </div>
                ) : null}
            </div>
        </div>
    )
}
