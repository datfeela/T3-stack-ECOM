import { Cart } from '~/modules/features/HeaderCart'
import { Auth } from './Components/Auth/Auth'
import s from './Header.module.scss'
import Link from 'next/link'

export const Header: React.FC = () => {
    return (
        <div className={s.wrap}>
            <header className={s.header}>
                <div>
                    <Link href='/catalog'>Catalog</Link>
                </div>
                <div>
                    <span className={s.logo}>nu tut logo</span>
                </div>
                <div className={s.right}>
                    <div>search feature</div>
                    <Auth />
                    <Cart />
                </div>
            </header>
        </div>
    )
}
