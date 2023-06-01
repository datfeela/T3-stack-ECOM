import Image from '~/modules/shared/components/Image/Image'
import s from './SignIn.module.scss'
import type { AuthProviders } from '~/modules/shared/types/types'
import { signIn } from 'next-auth/react'

interface SignInProps {
    providers: AuthProviders
}

export const SignIn = ({ providers }: SignInProps) => {
    const providersEls =
        providers &&
        Object.values(providers).map(({ name, id }) => (
            <button
                className={s.providers__item}
                key={id}
                onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    signIn(id, { callbackUrl: `${window.location.origin}` })
                }}
            >
                <Image
                    src={`/sign-in-providers/${name}.png`}
                    alt={`${name}`}
                    orientation='16/9'
                    objectFit='contain'
                    sizes='300px'
                />
                <h3>{name}</h3>
            </button>
        ))

    return (
        <main className={s.main}>
            <div className={s.wrap}>
                <h1>
                    Sign in <span>with</span>
                </h1>
                <div className={s.providers}>{providersEls}</div>
            </div>
        </main>
    )
}
