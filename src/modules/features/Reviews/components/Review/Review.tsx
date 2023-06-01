import { ClippedContainer } from '~/modules/shared/components/ClippedContainer/ClippedContainer'
import s from './Review.module.scss'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'
import userImagePlaceholder from '~/modules/shared/images/user.webp'
import ImageFill from '~/modules/shared/components/Image/Image'
import Link from 'next/link'
import { LikeIcon } from '../LikeIcon/LikeIcon'

interface ReviewProps {
    productId: string
    id: string
    userName: string | null | undefined
    userImgSrc: string | null | undefined
    message: string | null
    rating: 0 | 1
    date: string
    expandedMode: boolean
    isActive?: boolean
}

export const Review = ({
    productId,
    id,
    userImgSrc,
    userName,
    message,
    rating,
    date,
    expandedMode,
    isActive,
}: ReviewProps) => {
    return (
        <ClippedContainer clipSize='md' height='full' borderColor={isActive ? 'blue' : 'purple'}>
            <div className={`${s.wrap} ${expandedMode ? s.wrap_expandedMode : ''}`}>
                <div className={`${s.header} ${expandedMode ? s.header_expandedMode : ''}`}>
                    <div className={s.header__left}>
                        <div className={s.avatar}>
                            <ImageFill src={userImgSrc || userImagePlaceholder} sizes='100px' />
                        </div>
                        <div className={s.info}>
                            {userName ? <span className={s.name}>{userName}</span> : null}
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
                            rating === 0 ? s.header__scoreIcon_dislike : ''
                        }`}
                    >
                        {expandedMode ? (
                            <span>{rating === 1 ? 'Recommended' : 'Not Recommended'}</span>
                        ) : null}
                        <LikeIcon
                            size='md'
                            isReversed={rating === 0}
                            color={!expandedMode ? 'white' : rating === 0 ? 'red' : 'blue'}
                        />
                    </div>
                </div>
                <div className={`${s.reviewText} ${expandedMode ? s.reviewText_expandedMode : ''}`}>
                    <span className={s.gridPlaceholder}></span>
                    <span> {message}</span>
                </div>
                {!expandedMode ? (
                    <Link
                        href={`/game/${productId}?reviewsMode=true&activeComment=${id}`}
                        className={s.btnToReview}
                    >
                        <SvgSelector id='arrowDefault' />
                    </Link>
                ) : null}
            </div>
        </ClippedContainer>
    )
}
