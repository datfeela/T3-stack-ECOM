import Link from 'next/link'

interface WithLinkProps {
    withLink: boolean
    href?: string
    children: React.ReactNode
}

export const WithLink = ({ children, withLink, href }: WithLinkProps) => {
    if (!withLink || !href) return <>{children}</>

    return <Link href={href}>{children}</Link>
}
