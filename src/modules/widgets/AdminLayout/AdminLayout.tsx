import Link from 'next/link'
import { useRouter } from 'next/router'
import { deleteAdminCookie } from '~/modules/entities/admin'
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

    const logOut = () => {
        deleteAdminCookie()
        router.push('/admin/auth')
    }

    function createNavLinks() {
        const linksProducts: LinkObject[] = [{ name: 'Add product', href: '/admin/products/add' }]

        const linksMain: LinkObject[] = [
            { name: 'Main', href: '/admin' },
            { name: 'Products', href: '/admin/products', sublinks: linksProducts },
            { name: 'Settings', href: '/admin/settings' },
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
                    <ul style={{ marginLeft: '15px' }}>{sublinksElements}</ul>
                </li>
            )
        }

        return linkEls
    }

    const linkEls = createNavLinks()

    return (
        <div className={s.wrap + ' adminLayout'}>
            <div className={s.sidebar}>
                <nav>
                    <ul className={s.nav}>{linkEls}</ul>
                </nav>
                <button onClick={logOut}>LOG OUT</button>
            </div>
            <div className={s.conent}>{children}</div>
        </div>
    )
}
