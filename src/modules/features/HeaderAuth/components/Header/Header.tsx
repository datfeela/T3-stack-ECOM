import type { Session } from 'next-auth'
import s from './Header.module.scss'
import Image from '~/modules/shared/components/Image/Image'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'

interface HeaderProps {
    sessionData: Session | null
    isSessionDataLoaded: boolean
    isSignedIn: boolean
    handleClick: () => void
}

export const Header = ({
    sessionData,
    handleClick,
    isSessionDataLoaded,
    isSignedIn,
}: HeaderProps) => {
    return (
        <div className={s.header} onClick={handleClick}>
            <div className={s.profileIcon}>
                {sessionData?.user.image ? (
                    <Image src={sessionData.user.image} objectFit='cover' sizes='50px' alt='' />
                ) : (
                    <SvgSelector id='profile' />
                )}
            </div>
            {isSessionDataLoaded && !isSignedIn ? <span>Sign in</span> : null}
            {sessionData?.user.name ? (
                <div className={s.profileName}>{sessionData.user.name}</div>
            ) : null}
        </div>
    )
}
