import { type MouseEvent, useRef, useEffect, useState } from 'react'
import { useWindowSize } from '../../hooks/useWindowSize'
import { SvgSelector } from '../SvgSelector/SvgSelector'
import s from './Popup.module.scss'
import { useBodyNoScroll } from '../../hooks/useBodyNoScroll'

export interface PopupProps {
    isPopupActive: boolean
    deactivatePopup: () => void
    children: React.ReactNode
    size?: 'fitContent' | 'full'
}

const Popup = ({ isPopupActive, deactivatePopup, children, size }: PopupProps) => {
    const closeBtnRef = useRef<HTMLDivElement>(null)

    // if screen is wider, than 18 / 10, layout changes
    const { height, width } = useWindowSize()
    const [isWideScreen, setIsWideScreen] = useState(width / height > 2)

    useEffect(() => {
        if (isPopupActive && width / height > 1.8) setIsWideScreen(true)
        else setIsWideScreen(false)
    }, [height, width, isPopupActive])

    useBodyNoScroll(isPopupActive)
    //

    const handleClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        if (!(e.target instanceof Element)) return

        if (closeBtnRef.current?.contains(e.target) || !e.target.closest(`.${s.wrapRelative}`))
            deactivatePopup()
    }

    return (
        <div
            onClick={handleClick}
            className={`${s.wrapFixed} ${isPopupActive ? s.wrapFixed_visible : ''}`}
        >
            <div
                className={`${s.wrapRelative}  ${
                    size === 'fitContent' ? s.wrapRelative_fitContent : ''
                }  ${isWideScreen ? s.wrapRelative_wide : ''}`}
            >
                <div className={s.content}>{children}</div>
                <div ref={closeBtnRef} className={s.icon}>
                    <SvgSelector id='close' />
                </div>
            </div>
        </div>
    )
}

export default Popup
