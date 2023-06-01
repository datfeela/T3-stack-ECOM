import { Cart } from '~/modules/features/HeaderCart'
import s from './Actions.module.scss'
import { SearchWithPopup } from '../SearchWithPopup/SearchWithPopup'
import { HeaderAuth } from '~/modules/features/HeaderAuth'

export const Actions = () => {
    return (
        <div className={s.actions}>
            <SearchWithPopup />
            <HeaderAuth />
            <Cart />
        </div>
    )
}
