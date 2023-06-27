import Link from 'next/link'
import s from './Nav.module.scss'
import { useState } from 'react'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'
import { CatalogNav } from '../CatalogNav/CatalogNav'
import { useHandleCloseHeaderPopup } from '~/modules/shared/hooks/useHandleCloseHeaderPopup'
import { useMatchMedia } from '~/modules/shared/hooks/useMatchMedia'

export const Nav = () => {
    const [isCatalogExpanded, setIsCatalogExpanded] = useState(false)
    const matchMedia = useMatchMedia()

    const catalogWrapRef = useHandleCloseHeaderPopup({
        close: () => {
            if (
                matchMedia &&
                (matchMedia.isLess480 || matchMedia.isMore480 || matchMedia.isMore768)
            )
                return

            setIsCatalogExpanded(false)
        },
    })

    return (
        <div className={s.nav}>
            <div
                className={`${s.catalogWrap} ${isCatalogExpanded ? s.catalogWrap_expanded : ''}`}
                ref={catalogWrapRef}
            >
                <div
                    className={s.nav__item}
                    onClick={() => {
                        setIsCatalogExpanded(!isCatalogExpanded)
                    }}
                >
                    <span>Catalog</span>
                    <button
                        type='button'
                        className={`${s.catalogBtn} ${
                            isCatalogExpanded ? s.catalogBtn_reversed : ''
                        }`}
                    >
                        <SvgSelector id='arrowExpand' />
                    </button>
                </div>
                <div className={s.catalogContent}>
                    <CatalogNav isExpanded={isCatalogExpanded} />
                </div>
            </div>
            <Link className={s.nav__item} href='/catalog?sale=true'>
                Sale
            </Link>
            {/* <a className={s.nav__item} href='#'>
                About us
            </a> */}
        </div>
    )
}
