import { Auth } from './Auth/Auth'
import s from './Header.module.scss'

export const Header: React.FC = () => {
    return (
        <header className={s.header}>
            <div>nu tut menu</div>
            <div>
                <span className={s.logo}>nu tut logo</span>
            </div>
            <div className={s.right}>
                <div>search feature</div>
                <Auth />
                <div>basket feature</div>
            </div>
        </header>
    )
}
