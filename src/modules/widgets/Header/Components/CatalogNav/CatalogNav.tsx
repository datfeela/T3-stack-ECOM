import s from './CatalogNav.module.scss'
import { useMatchMedia } from '~/modules/shared/hooks/useMatchMedia'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCategoriesData } from '~/modules/shared/hooks/api/useCategoriesData'
import { usePlatformsData } from '~/modules/shared/hooks/api/usePlatformsData'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'
import { WithClippedContainer } from '~/modules/shared/components/ClippedContainer/WithClippedContainer'

interface CatalogNavProps {
    isExpanded: boolean
}

export const CatalogNav = ({ isExpanded }: CatalogNavProps) => {
    const matchMedia = useMatchMedia()
    const isDesktop =
        !matchMedia ||
        (matchMedia && (matchMedia.isMore960 || matchMedia.isMore1200 || matchMedia.isMore1440))

    const [isGenresActive, setIsGenresActive] = useState(false)
    const [isPlatformActive, setIsPlatformActive] = useState(false)

    useEffect(() => {
        if (isExpanded) return
        setIsPlatformActive(false)
        setIsGenresActive(false)
    }, [isExpanded])

    const categories = useCategoriesData({ refetchOnWindowFocus: false })
    const platforms = usePlatformsData()

    const categoriesEls = categories?.map(({ id, name }) => (
        <Link className={s.sublink} key={id} href={`/catalog?category=${id}`}>
            {name}
        </Link>
    ))

    const platformEls = platforms.map(({ id, name }) => (
        <Link
            className={`${s.sublink} ${s.sublink_withIcon}`}
            key={id}
            href={`/catalog?platform=${id}`}
        >
            <SvgSelector id={name} />
            {name === 'ps' ? 'PlayStation' : name}
        </Link>
    ))

    return (
        <div className={`${s.wrap} ${isExpanded ? s.wrap_expanded : ''}`}>
            <WithClippedContainer
                withContainer={isDesktop}
                corners={{ botLeft: true, botRight: true }}
                background={false}
            >
                <div className={s.content}>
                    <Link className={s.item} href='/catalog'>
                        All games
                    </Link>
                    <div
                        onClick={() => {
                            setIsGenresActive(!isGenresActive)
                            setIsPlatformActive(false)
                        }}
                        className={`${s.item} ${isGenresActive ? s.item_active : ''}`}
                    >
                        <span>Genres</span>
                        <button
                            type='button'
                            className={`${s.expandBtn} ${
                                isGenresActive ? s.expandBtn_reversed : ''
                            }`}
                        >
                            <SvgSelector id='arrowExpand' />
                        </button>
                    </div>
                    <div
                        className={`${s.sublistWrap} ${isGenresActive ? s.sublistWrap_active : ''}`}
                    >
                        <div className={s.sublist}>{categoriesEls}</div>
                    </div>
                    <div
                        onClick={() => {
                            setIsGenresActive(false)
                            setIsPlatformActive(!isPlatformActive)
                        }}
                        className={`${s.item} ${isPlatformActive ? s.item_active : ''}`}
                    >
                        <span>Platform</span>
                        <button
                            type='button'
                            className={`${s.expandBtn} ${
                                isPlatformActive ? s.expandBtn_reversed : ''
                            }`}
                        >
                            <SvgSelector id='arrowExpand' />
                        </button>
                    </div>
                    <div
                        className={`${s.sublistWrap} ${
                            isPlatformActive ? s.sublistWrap_active : ''
                        }`}
                    >
                        <div className={s.sublist}>{platformEls}</div>
                    </div>
                </div>
            </WithClippedContainer>
            <div
                className={`${s.popup} ${isGenresActive || isPlatformActive ? s.popup_active : ''}`}
            >
                <WithClippedContainer
                    withContainer={true}
                    corners={{ botLeft: true, botRight: true }}
                    background={false}
                >
                    <div className={s.popup__content}>
                        {isGenresActive && !isPlatformActive ? <>{categoriesEls}</> : null}
                        {!isGenresActive && isPlatformActive ? <>{platformEls}</> : null}
                    </div>
                </WithClippedContainer>
            </div>
        </div>
    )
}
