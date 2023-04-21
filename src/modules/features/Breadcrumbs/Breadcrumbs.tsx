import { useRouter } from 'next/router'
import s from './Breadcrumbs.module.scss'
import Link from 'next/link'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'

export interface BreadcrumbsProps {
    pidName?: string
}

export const Breadcrumbs = ({ pidName }: BreadcrumbsProps) => {
    const router = useRouter()

    let currentPath = ''

    let paths = router.pathname.split('/').map((path) => {
        if (path === '') return { name: 'Main', link: '/' }

        currentPath += `/${path}`

        // change paths here
        if (path === 'game') return { name: 'Catalog', link: '/catalog' }
        //

        // change pid for name via props
        if (path === '[pid]')
            return { name: pidName, link: currentPath.replace('[pid]', router.query.pid as string) }
        return { name: path, link: currentPath }
    })

    router.query.reviewsMode && paths.push({ name: 'Reviews', link: '' })
    router.query.recommendedGamesMode && paths.push({ name: 'Recommended games', link: '' })

    return (
        <div className={`${s.wrap} wrap`}>
            {paths.map(({ name, link }, id) => {
                if (id + 1 === paths.length)
                    return (
                        <div key={id} className={s.link + ' ' + s.link_active}>
                            <span>{name}</span>
                        </div>
                    )

                return (
                    <Link className={s.link} href={link} key={id}>
                        <span>{name}</span>
                        <SvgSelector id='breadcrumbsArrow' />
                    </Link>
                )
            })}
        </div>
    )
}
