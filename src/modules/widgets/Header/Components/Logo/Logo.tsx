import Link from 'next/link'
import s from './Logo.module.scss'

export const Logo = () => {
    return (
        <Link href='/' className={s.logo}>
            T3-ECOM
        </Link>
    )
}
