import Link from 'next/link'
import s from './AdminMain.module.scss'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'

export const AdminMain = () => {
    return (
        <>
            <h1>Welcome to admin page!</h1>
            <Link href='admin/products'>
                <div className={s.link}>
                    <h3>To products</h3>
                    <SvgSelector id='arrowDefault' />
                </div>
            </Link>
            <Link href='admin/content'>
                <div className={s.link}>
                    <h3>To content</h3>
                    <SvgSelector id='arrowDefault' />
                </div>
            </Link>
            <Link href='admin/orders'>
                <div className={s.link}>
                    <h3>To orders</h3>
                    <SvgSelector id='arrowDefault' />
                </div>
            </Link>
        </>
    )
}
