import { useSession } from 'next-auth/react'
import { api } from '~/modules/shared/api/apiTRPC'

export const useUserWishes = () => {
    const { data: sessionData } = useSession()
    const userId = sessionData?.user.id

    return api.user.getUserWishes.useQuery(userId || '')?.data?.wishedProducts
}
