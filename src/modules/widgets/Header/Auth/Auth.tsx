import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export const Auth: React.FC = () => {
    const { data: sessionData } = useSession()

    const router = useRouter()

    return (
        <div>
            <p>
                {sessionData && <span>Профиль</span>}
                {/* здесь компонент с профилем (в который мы прокидываем сессию?) */}
            </p>
            {router.pathname !== '/signin' ? (
                <button onClick={sessionData ? () => void signOut() : () => void signIn()}>
                    {sessionData ? 'Sign out' : 'Sign in'}
                </button>
            ) : null}
        </div>
    )
}
