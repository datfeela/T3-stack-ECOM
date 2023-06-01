import Link from 'next/link'
import s from './AppLogo.module.scss'

export const AppLogo = ({ view }: { view: 'header' | 'footer' }) => {
    return (
        <Link
            href='/'
            className={`${s.logo} ${view === 'header' ? s.logo_header : ''} ${
                view === 'footer' ? s.logo_footer : ''
            }`}
        >
            T3-ECOM
        </Link>
    )
}
