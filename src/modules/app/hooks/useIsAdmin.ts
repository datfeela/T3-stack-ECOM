import { useRouter } from 'next/router'

export const useIsAdmin = () => {
    const router = useRouter()

    const isAdminPage = router.pathname.indexOf('/admin') === 0

    return isAdminPage
}
