import s from './Header.module.scss'
import Link from 'next/link'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'
import type { Dispatch, SetStateAction } from 'react'
import { LikeIcon } from '../LikeIcon/LikeIcon'
import { AddReviewButton } from '../AddReviewButton/AddReviewButton'

interface HeaderProps {
    expandedMode: boolean
    productId: string
    productName: string
    scoresCount: number
    percentUsersRecommend: number
    isAddFormActive: boolean
    setIsAddFormActive: Dispatch<SetStateAction<boolean>>
    reviewsVisibleQuantity: number
}

export const Header = ({
    expandedMode,
    productId,
    productName,
    percentUsersRecommend,
    scoresCount,
    isAddFormActive,
    setIsAddFormActive,
    reviewsVisibleQuantity,
}: HeaderProps) => {
    return (
        <div
            className={`${s.header} ${expandedMode ? s.header_expandedMode : ''} ${
                isAddFormActive ? s.header_withAddForm : ''
            }`}
        >
            <div className={s.header__left}>
                <h2 className={s.title}>
                    Customer Reviews {expandedMode ? `on ${productName}` : ''}
                </h2>
                {scoresCount > 0 ? (
                    <div className={s.rating}>
                        {!expandedMode ? (
                            <LikeIcon isReversed={percentUsersRecommend < 50} size='sm' />
                        ) : null}
                        <span className={s.rating__number}>{percentUsersRecommend}%</span>
                        <span className={s.rating__text}> recommended</span>
                    </div>
                ) : null}
                {expandedMode ? (
                    <div className={s.header__bottom}>
                        <div className={s.reviewsCount}>{scoresCount} reviews</div>
                        <AddReviewButton
                            isAddFormActive={isAddFormActive}
                            setIsAddFormActive={setIsAddFormActive}
                            margin={false}
                        />
                    </div>
                ) : null}
            </div>
            {scoresCount > reviewsVisibleQuantity ? (
                <Link href={`/game/${productId}?reviewsMode=true`} className={s.expandBtn}>
                    <span>See all reviews</span>
                    <div className={s.expandBtn__icon}>
                        <SvgSelector id='arrowDefault' />
                    </div>
                </Link>
            ) : null}
        </div>
    )
}
