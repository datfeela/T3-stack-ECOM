import Link from 'next/link'
import s from './AdminContentEdit.module.scss'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'

export const AdminContentEdit = () => {
    return (
        <>
            <h1>Edit content</h1>
            <Link href='/admin/content/main'>
                <div className={s.link}>
                    <h3>Main page slider</h3>
                    <SvgSelector id='arrowDefault' />
                </div>
            </Link>
        </>
    )
}
