import s from './Favorites.module.scss'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'
import { useUserId } from '~/modules/shared/hooks/useUserId'
import { useFavorites } from './hooks/useFavorites'

export interface FavoritesProps {
    id: string
    withBg?: boolean
    view?: 'icon' | 'iconWithText'
}

export const Favorites = ({ id, withBg = false, view = 'icon' }: FavoritesProps) => {
    const userId = useUserId()

    const {
        isPending,
        isWished,
        handleClick: handleButtonClick,
    } = useFavorites({ productId: id, userId })

    if (!userId) return null

    return (
        <button
            type='button'
            className={`${s.wrap} ${view === 'iconWithText' ? s.wrap_withText : ''} ${
                withBg ? s.wrap_bg : ''
            } ${isPending ? s.wrap_disabled : ''}`}
            onClick={handleButtonClick}
        >
            {isWished ? (
                <>
                    <div className={s.icon}>
                        <SvgSelector id='favoritesActive' />
                    </div>
                    {view === 'iconWithText' ? <span>Remove from wishlist</span> : null}
                </>
            ) : null}
            {!isWished ? (
                <>
                    <div className={s.icon}>
                        <SvgSelector id='favorites' />
                    </div>
                    {view === 'iconWithText' ? <span>Move to wishlist</span> : null}
                </>
            ) : null}
        </button>
    )
}
