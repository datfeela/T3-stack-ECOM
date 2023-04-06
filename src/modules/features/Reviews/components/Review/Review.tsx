import { ClippedContainer } from '~/modules/shared/components/ClippedContainer/ClippedContainer'
import s from './Review.module.scss'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'

interface ReviewProps {
    userName: string | null | undefined
    userImgSrc: string | null | undefined
    message: string | null
    rating: 0 | 1
    date: string
}

export const Review = ({ userImgSrc, userName, message, rating, date }: ReviewProps) => {
    return (
        <ClippedContainer clipSize='sm' height='full'>
            <div className={s.header}>
                <div className={s.header__left}>
                    <div className={s.avatar}>
                        <SvgSelector id='user' />
                    </div>
                    <div className={s.info}>
                        {userName ? <span className={s.name}></span> : null}
                        <div className={s.date}>
                            <div className={s.date__icon}>
                                <SvgSelector id='date' />
                            </div>
                            <span>{date}</span>
                        </div>
                    </div>
                </div>
                <div
                    className={`${s.header__scoreIcon} ${
                        rating === 0 ? s.header__scoreIcon_rotate : ''
                    }`}
                >
                    <SvgSelector id='like' />
                </div>
            </div>
            <div className={s.reviewText}>{message}</div>
            <button className={s.btnToReview}>
                <SvgSelector id='arrowDefault' />
            </button>
        </ClippedContainer>
    )
}
