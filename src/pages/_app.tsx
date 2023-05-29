import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import '~/modules/app/styles/globals.scss'
import { GlobalContextProvider, useIsAdmin } from '~/modules/app'
import { api } from '~/modules/shared/api/apiTRPC'
import { Header } from '~/modules/widgets/Header'
import { Footer } from '~/modules/widgets/Footer'

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    const isAdminPage = useIsAdmin()

    return (
        <>
            <SessionProvider session={session}>
                <GlobalContextProvider>
                    {!isAdminPage ? <Header /> : null}
                    <Component {...pageProps} />
                    {!isAdminPage ? <Footer /> : null}
                </GlobalContextProvider>
            </SessionProvider>
        </>
    )
}

export default api.withTRPC(MyApp)
