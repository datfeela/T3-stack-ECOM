import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'
import s from './Reviews.module.scss'
import { api } from '~/modules/shared/api/apiTRPC'
import { Review } from './components/Review/Review'
import { parseDateToString } from '~/modules/shared/lib/parseDateToString'
import { useState } from 'react'

interface reviewsProps {
    productId: string
    negativeScoresCount: number
    positiveScoresCount: number
}

export const Reviews = ({ negativeScoresCount, positiveScoresCount, productId }: reviewsProps) => {
    const scoresCount = positiveScoresCount + negativeScoresCount

    const percentUsersRecommend = Math.round((positiveScoresCount / scoresCount) * 100)

    const [taken, setTaken] = useState(0)

    const addReview = api.products.addReviewToProduct.useMutation()

    const reviews = api.products.getProductReviewsById.useQuery({
        id: productId,
        quantity: 4,
        quantityToSkip: taken,
    }).data
    const reviewEls = reviews
        ? reviews.map(({ User, message, rating, id, date }) => {
              const ratingTyped = rating as 0 | 1

              return (
                  <Review
                      key={id}
                      userName={User?.name}
                      userImgSrc={User?.image}
                      message={message}
                      rating={ratingTyped}
                      date={parseDateToString(date)}
                  />
              )
          })
        : null

    return (
        <div className='wrap'>
            <div className={s.header}>
                <div className={s.header__left}>
                    <h2 className={s.title}>Customer Reviews</h2>
                    {scoresCount > 0 ? (
                        <div className={s.rating}>
                            <div
                                className={`${s.rating__icon} ${
                                    percentUsersRecommend < 50 ? s.rating__icon_reversed : ''
                                }`}
                            >
                                <SvgSelector id='like' />
                            </div>
                            <span>{percentUsersRecommend}% recommended</span>
                        </div>
                    ) : (
                        <div>placeholder</div>
                    )}
                </div>
                <button className={s.expandBtn}>
                    <span>See all reviews</span>
                    <div className={s.expandBtn__icon}>
                        <SvgSelector id='arrowDefault' />
                    </div>
                </button>
            </div>
            <div className={s.reviews}>
                {reviewEls ? reviewEls : <div className={s.reviews__placeholder}></div>}
            </div>
            <button
                onClick={() => {
                    setTaken(taken + 1)
                }}
            >
                do weird things
            </button>{' '}
            <button
                onClick={() => {
                    addReview.mutate({
                        productId,
                        rating: 1,
                        message:
                            'Lorem ipsum dolor sit amet consectetur. Dignissim lacus imperdiet rhoncus consectetur tortor tincidunt vel lacinia. Mauris posuere mi mi eget pellentesque iaculis. Duis adipiscing mollis at tellus ultrices diam at. Integer quisque id dolor ultrices egestas turpis netus molestie blandit. Suspendisse mollis porta tincidunt in. Porttitor vel viverra ut nisl scelerisque elements, Lorem ipsum dolor sit amet consectetur. Dignissim lacus imperdiet rhoncus consectetur tortor tincidunt vel lacinia. Mauris posuere mi mi eget pellentesque iaculis. Duis adipiscing mollis at tellus ultrices diam at. Integer quisque id dolor ultrices egestas turpis netus molestie blandit. Suspendisse mollis',
                    })
                }}
            >
                add review
            </button>
        </div>
    )
}
