import { signIn, useSession } from 'next-auth/react'

import s from './HeaderAuth.module.scss'
import { useHeaderAuthPopup } from './hooks/useHeaderAuthPopup'
import { useHandleCloseHeaderPopup } from '~/modules/shared/hooks/useHandleCloseHeaderPopup'
import { useMatchMedia } from '~/modules/shared/hooks/useMatchMedia'
import { WithLink } from '~/modules/shared/components/WithLink/WithLink'
import { WithClippedContainer } from '~/modules/shared/components/ClippedContainer/WithClippedContainer'
import { Header } from './components/Header/Header'
import { Popup } from './components/Popup/Popup'

export const HeaderAuth: React.FC = () => {
    const { data: sessionData } = useSession()

    const { isPopupActive, setIsPopupActive } = useHeaderAuthPopup({
        containerClassName: `.${s.wrap}`,
    })

    const wrapRef = useHandleCloseHeaderPopup({
        close: () => {
            setIsPopupActive(false)
        },
    })

    const isSessionDataLoaded = sessionData !== undefined
    const isSignedIn = sessionData !== null && !!sessionData?.user

    const matchMedia = useMatchMedia()

    const isDesktop =
        !!matchMedia && (matchMedia.isMore960 || matchMedia.isMore1200 || matchMedia.isMore1440)

    const isMobile =
        !!matchMedia && !(matchMedia.isMore960 || matchMedia.isMore1200 || matchMedia.isMore1440)

    return (
        <div
            ref={wrapRef}
            className={`${s.wrap} ${isDesktop && isPopupActive ? s.wrap_active : ''}`}
        >
            {/* <WithLink
                href={isSessionDataLoaded && !isSignedIn ? '/profile' : undefined}
                withLink={isMobile}
            > */}
            <div className={s.headerWrap}>
                <Header
                    sessionData={sessionData}
                    isSignedIn={isSignedIn}
                    isSessionDataLoaded={isSessionDataLoaded}
                    handleClick={() => {
                        if (isDesktop) setIsPopupActive(!isPopupActive)
                        else {
                            isSessionDataLoaded && !isSignedIn && void signIn()
                        }
                    }}
                />
            </div>
            {/* </WithLink> */}
            <div className={s.popup}>
                <WithClippedContainer
                    withContainer={isDesktop}
                    backdropFilter={true}
                    corners={{ botLeft: true }}
                    clipSize='sm'
                >
                    <Popup sessionData={sessionData} />
                </WithClippedContainer>
            </div>
        </div>
    )
}
