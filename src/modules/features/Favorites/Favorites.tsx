import { api } from '~/modules/shared/api/apiTRPC'
import s from './Favorites.module.scss'
import { useSession } from 'next-auth/react'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'
import { useEffect, useState } from 'react'
import { useDebouncedValue } from '~/modules/shared/hooks/useDebouncedValue'

export interface FavoritesProps {
    id: string
    withBg?: boolean
}

export const Favorites = ({ id, withBg = false }: FavoritesProps) => {
    // todo: refactor to react context???
    const session = useSession()
    const userId = session.data?.user.id

    const apiContext = api.useContext()
    const userFavorites = api.user.getUserWishes.useQuery(userId || '').data
    const wishedProduct = userFavorites?.wishedProducts.find((product) => product.id === id)

    const [isPending, setIsPending] = useState(false)

    const toggleFavorites = api.products.toggleProductToWishes.useMutation({
        onMutate: async () => {
            setIsPending(true)
            await apiContext.user.getUserWishes.cancel()
            const optimisticUpdate = apiContext.user.getUserWishes.getData()

            if (optimisticUpdate) {
                apiContext.user.getUserWishes.setData(id, optimisticUpdate)
            }
        },
        onSuccess: async () => {
            await apiContext.user.getUserWishes.invalidate()
        },
        onSettled: () => {
            setIsPending(false)
        },
    })

    const handleClick = () => {
        if (isPending) return
        toggleFavorites.mutate({ action: wishedProduct ? 'delete' : 'add', productId: id })
    }

    // useEffect(() => {
    //     setIsFavorited(wishedProduct ? true : false)
    // }, [wishedProduct])

    if (!userId) return null

    return (
        <button
            type='button'
            className={`${s.wrap} ${withBg ? s.wrap_bg : ''} ${isPending ? s.wrap_disabled : ''}`}
            onClick={() => {
                handleClick()
            }}
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
