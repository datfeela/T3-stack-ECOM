import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'
import s from './WithBurger.module.scss'
import { useBurger } from '../../hooks/useBurger'
import { useHandleCloseHeaderPopup } from '~/modules/shared/hooks/useHandleCloseHeaderPopup'

export const WithBurger = ({ children }: { children: React.ReactNode }) => {
    const { isBurgerActive, activateBurger, deactivateBurger } = useBurger()
    const burgerRef = useHandleCloseHeaderPopup({ close: deactivateBurger })

    return (
        <>
            <div ref={burgerRef} className={s.burgerWrap}>
                <div
                    className={`${s.burger} ${isBurgerActive ? s.burger_active : ''}`}
                    onClick={() => {
                        isBurgerActive ? deactivateBurger() : activateBurger()
                    }}
                >
                    <span className={s.first}></span>
                    <span className={s.second}></span>
                    <span className={s.third}></span>
                </div>
                <div
                    className={`${s.burgerContentWrap} ${
                        !isBurgerActive ? s.burgerContentWrap_hidden : ''
                    }`}
                >
                    {children}
                </div>
            </div>
            <div className={`${s.burgerBg} ${!isBurgerActive ? s.burgerBg_hidden : ''}`}></div>
            {isBurgerActive ? (
                <button type='button' onClick={deactivateBurger} className={s.closeBurgerBtn}>
                    <SvgSelector id='close' />
                </button>
            ) : null}
        </>
    )
}
