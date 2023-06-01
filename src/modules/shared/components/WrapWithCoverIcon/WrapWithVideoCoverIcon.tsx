import { SvgSelector } from '../SvgSelector/SvgSelector'
import s from './WrapWithVideoCoverIcon.module.scss'

export const WithVideoCoverIcon = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={s.wrap}>
            <div className={s.icon}>
                <SvgSelector id='videoPlay' />
            </div>
            {children}
        </div>
    )
}
