import Link from 'next/link'
import s from './PolicyLinks.module.scss'

export const PolicyLinks = () => {
    return (
        <div className={s.wrap}>
            <Link href='/privacy'>Privacy Policy</Link>
            <Link href='/uterms'>Website Terms of Use</Link>
            <Link href='/cookies'>Cookies Policy</Link>
        </div>
    )
}
