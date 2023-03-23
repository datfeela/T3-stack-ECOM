import Link from 'next/link'
import { useRouter } from 'next/router'
import { deleteAdminCookie } from '~/modules/entities/admin'
import { ButtonDefault } from '~/modules/shared/components/Buttons/Buttons'
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

        const linksMain: LinkObject[] = [
            { name: 'Main', href: '/admin' },
            { name: 'Products', href: '/admin/products', sublinks: linksProducts },
            { name: 'Settings', href: '/admin/settings' },
            { name: 'Magic page', href: '/admin/test' },
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
                <ButtonDefault handleClick={logOut} color='red' fontW='700'>
                    LOG OUT
                </ButtonDefault>
            </div>
            <div className={s.content}>{children}</div>
        </div>
    )
}
