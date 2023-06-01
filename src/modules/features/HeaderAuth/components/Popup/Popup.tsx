import Link from 'next/link'
import s from './Popup.module.scss'
import type { Session } from 'next-auth'
import { ButtonDefault } from '~/modules/shared/components/Button/Button'
import { signIn, signOut } from 'next-auth/react'

interface PopupProps {
    sessionData: Session | null
}

export const Popup = ({ sessionData }: PopupProps) => {
    return (
        <div className={s.popupContent}>
            {sessionData?.user ? (
                <div className={s.links}>
                    <Link className={s.link_desktop} href='/profile'>
                        Profile
                    </Link>
                    <Link href='/orders'>Orders</Link>
                </div>
            ) : (
                <span className={s.signInText}>
                    Sign in to track your orders and see personal recommendations.
                </span>
            )}
            <div className={s.logInBtn}>
                <ButtonDefault
                    color='purple'
                    height='xs'
                    width='sm'
                    isGlitching={false}
                    onClick={sessionData ? () => void signOut() : () => void signIn()}
                >
                    {sessionData ? 'Sign out' : 'Sign in'}
                </ButtonDefault>
            </div>
        </div>
    )
}
