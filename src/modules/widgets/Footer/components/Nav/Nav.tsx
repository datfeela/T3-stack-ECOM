import Link from 'next/link'
import s from './Nav.module.scss'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'

const links = [
    {
        name: 'Support',
        href: '#',
        sublinks: [
            {
                name: 'Online Ordering',
                href: '#',
            },
            {
                name: 'Returns & Exchange',
                href: '#',
            },
            {
                name: 'Customer Service',
                href: '#',
            },
            {
                name: 'Contact Us',
                href: '#',
            },
        ],
    },
    {
        name: 'Sitemap',
        sublinks: [
            {
                name: 'Home',
                href: '/',
            },
            {
                name: 'Catalog',
                href: '/catalog',
            },
            {
                name: 'Sale',
                href: '/catalog?sale=true',
            },
            {
                name: 'Lorem ipsum',
                href: '#',
            },
        ],
    },
    {
        name: 'Socials',
        sublinks: [
            {
                name: 'insta',
                href: '#',
            },
            {
                name: 'vk',
                href: '#',
            },
            {
                name: 'tg',
                href: '#',
            },
        ],
    },
]

export const Nav = () => {
    const linksEls = links.map(({ name, sublinks, href }, mainId) => (
        <div key={mainId} className={s.column}>
            <Link className={`${s.link} ${!href ? s.link_noHref : ''}`} href={href || ''}>
                {name}
            </Link>
            {sublinks?.map(({ name: sublinkName, href: sublinkHref }, sublinkId) => (
                <Link
                    href={sublinkHref}
                    key={sublinkId}
                    className={`${s.sublink} ${name === 'Socials' ? s.sublink__icon : ''} ${
                        name === 'Socials' && sublinkName === 'tg' ? s.sublink__icon_stroke : ''
                    }`}
                >
                    {name === 'Socials' ? (
                        <SvgSelector id={sublinkName as 'insta' | 'vk' | 'tg'} />
                    ) : (
                        sublinkName
                    )}
                </Link>
            ))}
        </div>
    ))

    return <div className={s.wrap}>{linksEls}</div>
}
