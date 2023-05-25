import Link from 'next/link'
import s from './WithImageLink.module.scss'

interface WithImageLinkProps {
    href: string | undefined
    imageOrientation: string
    children: React.ReactNode
}

export const WithImageLink = ({ children, href, imageOrientation }: WithImageLinkProps) => {
    if (href)
        return (
            <Link className={s.imageLink} href={href} style={{ aspectRatio: imageOrientation }}>
                {children}
            </Link>
        )

    return <>{children}</>
}
