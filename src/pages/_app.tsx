import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import '~/modules/app/styles/globals.scss'
import { useIsAdmin } from '~/modules/app'
import { api } from '~/modules/shared/api/apiTRPC'
import { Header } from '~/modules/widgets/Header'

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    const isAdminPage = useIsAdmin()

    return (
        <>
            <SessionProvider session={session}>
                {!isAdminPage ? <Header /> : null}
                <Component {...pageProps} />
            </SessionProvider>
        </>
    )
}

export default api.withTRPC(MyApp)
