import { Cart } from '~/modules/features/HeaderCart'
import { Auth } from './Components/Auth/Auth'
import s from './Header.module.scss'

export const Header: React.FC = () => {
    return (
        <div className={s.wrap}>
            <header className={s.header}>
                <div>nu tut menu</div>
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
