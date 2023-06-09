import Link from 'next/link'
import { useRouter } from 'next/router'
import { deleteAdminCookie } from '~/modules/entities/admin'
import { ButtonDefault } from '~/modules/shared/components/Button/Button'
import s from './AdminLayout.module.scss'

interface Props {
    children: React.ReactNode
}

interface LinkObject {
    name: string
    href: string
    sublinks?: LinkObject[]
}

export const AdminLayout: React.FC<Props> = ({ children }) => {
    const router = useRouter()

    const logOut = async () => {
        deleteAdminCookie()
        await router.push('/admin/auth')
    }

    function createNavLinks() {
        const linksProducts: LinkObject[] = [{ name: 'Add product', href: '/admin/products/add' }]
        const linksContent: LinkObject[] = [{ name: 'Main page', href: '/admin/content/main' }]

        const linksMain: LinkObject[] = [
            { name: 'Main', href: '/admin' },
            { name: 'Products', href: '/admin/products', sublinks: linksProducts },
            {
                name: 'Content',
                href: '/admin/content',
                sublinks: linksContent,
            },
            { name: 'Orders', href: '/admin/orders' },
        ]

        const linkEls = linksMain.map((link) => {
            return createLinkElement(link)
        })

        function createLinkElement({ href, name, sublinks }: LinkObject) {
            let liClass = s.listItem
            if (router.pathname === href) liClass += ' ' + s.listItem_active
            let sublinksElements = null as JSX.Element[] | null
            if (sublinks?.length)
                sublinksElements = sublinks.map((link) => {
                    return createLinkElement(link)
                })

            return (
                <li key={href} className={liClass}>
                    <Link href={href}>{name}</Link>
                    <ul className={s.list}>{sublinksElements}</ul>
                </li>
            )
        }

        return linkEls
    }

    const linkEls = createNavLinks()

    return (
        <div className={s.wrap}>
            <div className={s.sidebar}>
                <nav>
                    <ul className={s.nav}>{linkEls}</ul>
                </nav>
                <ButtonDefault onClick={logOut} color='red' fontW='700'>
                    LOG OUT
                </ButtonDefault>
            </div>
            <div className={s.content}>{children}</div>
        </div>
    )
}
