import s from './Favorites.module.scss'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'
import { useFavorites } from './hooks/useFavorites'
import { useUserId } from '~/modules/shared/hooks/useUserId'

export interface FavoritesProps {
    id: string
    withBg?: boolean
}

export const Favorites = ({ id, withBg = false }: FavoritesProps) => {
    const userId = useUserId()

    const {
        isPending,
        wishedProduct,
        handleClick: handleButtonClick,
    } = useFavorites({ productId: id, userId })

    if (!userId) return null

    return (
        <button
            type='button'
            className={`${s.wrap} ${withBg ? s.wrap_bg : ''} ${isPending ? s.wrap_disabled : ''}`}
            onClick={handleButtonClick}
        >
            {(wishedProduct && !isPending) || (!wishedProduct && isPending) ? (
                <SvgSelector id='favoritesActive' />
            ) : null}
            {(!wishedProduct && !isPending) || (wishedProduct && isPending) ? (
                <SvgSelector id='favorites' />
            ) : null}
        </button>
    )
}
