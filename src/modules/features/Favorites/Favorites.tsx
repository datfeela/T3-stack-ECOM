import { api } from '~/modules/shared/api/apiTRPC'
import s from './Favorites.module.scss'
import { useSession } from 'next-auth/react'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'

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
    const toggleFavorites = api.products.toggleProductToWishes.useMutation({
        onMutate: async () => {
            await apiContext.user.getUserWishes.cancel()
            const optimisticUpdate = apiContext.user.getUserWishes.getData()

            if (optimisticUpdate) {
                apiContext.user.getUserWishes.setData(id, optimisticUpdate)
            }
        },
        onSuccess: async () => {
            await apiContext.user.getUserWishes.invalidate()
        },
    })

    const handleClick = () => {
        toggleFavorites.mutate({ action: wishedProduct ? 'delete' : 'add', productId: id })
    }

    if (!userId) return null

    return (
        <button
            type='button'
            className={`${s.wrap} ${withBg ? s.wrap_bg : ''}`}
            onClick={() => {
                handleClick()
            }}
        >
            <SvgSelector id={wishedProduct ? 'favoritesActive' : 'favorites'} />
        </button>
    )
}
