import { useEffect, useState } from 'react'
import s from './Success.module.scss'
import { useRouter } from 'next/router'
import { ButtonDefault } from '~/modules/shared/components/Button/Button'
import Link from 'next/link'

export const Success = () => {
    const [secondsTillRedirect, setSecondsTillRedirect] = useState(5)
    const router = useRouter()

    useEffect(() => {
        router.prefetch('/')
    }, [])

    useEffect(() => {
        setTimeout(() => {
            if (secondsTillRedirect === 1) router.replace('/', undefined, { scroll: true })
            if (secondsTillRedirect > 0) setSecondsTillRedirect(secondsTillRedirect - 1)
        }, 1000)
    }, [secondsTillRedirect])

    return (
        <div className={s.wrap}>
            <h3>Your order has been sent to specified email!</h3>
            <span className={s.desc}>
                You will be redirected to main page in {secondsTillRedirect} seconds
            </span>
            <ButtonDefault fontSize='md' color='purple'>
                <Link href='/'>To main page</Link>
            </ButtonDefault>
        </div>
    )
}
