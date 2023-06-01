import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'
import s from './ToTopBtn.module.scss'

export const ToTopBtn = () => {
    return (
        <button
            type='button'
            className={s.toTopBtn}
            onClick={() => {
                window?.scrollTo({ top: 0, behavior: 'smooth' })
            }}
        >
            <span>Return to Top</span>
            <SvgSelector id='arrowDefault' />
        </button>
    )
}
