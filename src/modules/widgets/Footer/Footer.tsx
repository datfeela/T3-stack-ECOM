import { AppLogo } from '~/modules/shared/components/AppLogo/AppLogo'
import s from './Footer.module.scss'
import { ToTopBtn } from './components/ToTopBtn/ToTopBtn'
import { PolicyLinks } from './components/PolicyLinks/PolicyLinks'
import { Nav } from './components/Nav/Nav'

export const Footer = () => {
    const dateNow = new Date()

    return (
        <footer className={s.footer}>
            <div className={s.footer__content}>
                <div className={s.mainGrid}>
                    <ToTopBtn />
                    <AppLogo view='footer' />
                    <Nav />
                </div>
                <div className={s.policy}>
                    <PolicyLinks />
                    <div className={s.bottom}>
                        <div>© {dateNow.getFullYear()} T3-Ecom Inc.</div>
                        All content, games titles, trade names and/or trade dress, trademarks,
                        artwork and associated imagery are trademarks and/or copyright material of
                        their respective owners. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    )
}
