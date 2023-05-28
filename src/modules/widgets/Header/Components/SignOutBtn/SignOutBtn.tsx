import { signOut, useSession } from 'next-auth/react'
import s from './SignOutBtn.module.scss'
import { ButtonDefault } from '~/modules/shared/components/Button/Button'

export const SignOutBtn = () => {
    const { data: sessionData } = useSession()

    if (!sessionData) return null

    return (
        <div className={s.btn}>
            <ButtonDefault
                color='purple'
                height='sm'
                width='sm'
                isGlitching={false}
                onClick={() => void signOut()}
            >
                Sign out
            </ButtonDefault>
        </div>
    )
}
