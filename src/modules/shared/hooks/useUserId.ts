import { useSession } from 'next-auth/react'

export const useUserId = () => {
    const session = useSession()
    const userId = session.data?.user.id

    return userId
}
