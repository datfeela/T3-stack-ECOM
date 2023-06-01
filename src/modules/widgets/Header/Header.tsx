import s from './Header.module.scss'
import { Nav } from './Components/Nav/Nav'
import { Actions } from './Components/Actions/Actions'
import { useScrollPosition } from '~/modules/shared/hooks/useScrollPosition'
import { useRouter } from 'next/router'
import { SearchWithPopup } from './Components/SearchWithPopup/SearchWithPopup'
import { HeaderAuth } from '~/modules/features/HeaderAuth'
import { HeaderCart } from '~/modules/features/HeaderCart/HeaderCart'
import { SignOutBtn } from './Components/SignOutBtn/SignOutBtn'
import { WithBurger } from './Components/WithBurger/WithBurger'
import { AppLogo } from '~/modules/shared/components/AppLogo/AppLogo'
export const Header: React.FC = () => {
    const scrollPosition = useScrollPosition()
    const router = useRouter()

    let headerClName = s.header
    if (scrollPosition > 10 || router.pathname !== '/game/[pid]')
        headerClName += ` ${s.header_border}`

    return (
        <div className={s.wrap}>
            <header>
                <div className={`${headerClName} ${s.header_desktop}`}>
                    <Nav />
                    <AppLogo view='header' />
                    <Actions />
                </div>
                <div className={`${headerClName} ${s.header_mobile}`}>
                    <AppLogo view='header' />
                    <div className={s.rightMd}>
                        <SearchWithPopup />
                        <WithBurger>
                            <div className={s.burgerContent}>
                                <div>
                                    <HeaderAuth />
                                    <HeaderCart />
                                    <div className={s.divider}></div>
                                    <Nav />
                                </div>
                                <SignOutBtn />
                            </div>
                        </WithBurger>
                    </div>
                </div>
            </header>
        </div>
    )
}
