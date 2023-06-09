import { useRouter } from 'next/router'
import { useState } from 'react'
import type { AdminInput } from '~/modules/entities/admin'
import { api } from '~/modules/shared/api/apiTRPC'

export const useAdminLogIn = () => {
    const router = useRouter()

    const [loginError, setLoginError] = useState(undefined as string | undefined)

    const logIn = api.admin.logIn.useMutation({
        onSuccess: ({ success }) => {
            if (!success) return

            return router.push('/admin')
        },
        onError: (e) => {
            setLoginError(e.message)
        },
    })

    const handleLogin = (values: AdminInput) => {
        logIn.mutate(values)
        setLoginError(undefined)
    }

    return { handleLogin, loginError }
}
