import { useEffect, useState } from 'react'
import s from './CookiesPolicyPopup.module.scss'
import Link from 'next/link'
import { ButtonDefault } from '~/modules/shared/components/Button/Button'

export const CookiesPolicyPopup = () => {
    const [cookiesPolicyAccept, setCookiesPolicyAccept] = useState('checked' as string | null)

    useEffect(() => {
        setCookiesPolicyAccept(localStorage.getItem('cookiesPolicyAccept'))
    }, [])

    const setPolicyChecked = () => {
        localStorage.setItem('cookiesPolicyAccept', 'checked')
        setCookiesPolicyAccept('checked')
    }

    return (
        <div className={`${s.wrap} ${!!cookiesPolicyAccept ? s.wrap_hidden : ''}`}>
            <div className={s.left}>
                <span>Site uses cookies to work properly</span>
                <Link target='_blank' rel='noreferrer' href='/cookies'>
                    How does this work?
                </Link>
            </div>
            <ButtonDefault
                onClick={setPolicyChecked}
                width='sm'
                height='xs'
                isGlitching={false}
                color='purple'
            >
                Got it
            </ButtonDefault>
        </div>
    )
}
