import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import '~/modules/app/styles/globals.scss'
import { useIsAdmin } from '~/modules/app'
import { GlobalContextProvider } from '~/modules/app/context'
import { CookiesPolicyPopup } from '~/modules/app/components/CookiesPolicyPopup'
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
                    <CookiesPolicyPopup />
                    {!isAdminPage ? <Footer /> : null}
                </GlobalContextProvider>
            </SessionProvider>
        </>
    )
}

export default api.withTRPC(MyApp)
