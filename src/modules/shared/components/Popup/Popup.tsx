import { type MouseEvent, useRef, useEffect, useState } from 'react'
import { useWindowSize } from '../../hooks/useWindowSize'
import { SvgSelector } from '../SvgSelector/SvgSelector'
import s from './Popup.module.scss'

export interface PopupProps {
    isPopupActive: boolean
    deactivatePopup: () => void
    children: React.ReactNode
}

const Popup = ({ isPopupActive, deactivatePopup, children }: PopupProps) => {
    const closeBtnRef = useRef<HTMLDivElement>(null)

    // if screen is wider, than 18 / 10, layout changes
    const { height, width } = useWindowSize()
    const [isWideScreen, setIsWideScreen] = useState(width / height > 2)

    useEffect(() => {
        if (isPopupActive && width / height > 1.8) setIsWideScreen(true)
        else setIsWideScreen(false)
    }, [height, width, isPopupActive])

    useEffect(() => {
        if (!document) return
        const bodyRef = document.body

        if (isPopupActive && !bodyRef.classList.contains('no-scroll')) {
            bodyRef.classList.add('no-scroll')
        }
        if (!isPopupActive && bodyRef.classList.contains('no-scroll')) {
            bodyRef.classList.remove('no-scroll')
        }
    }, [isPopupActive])
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
            <div className={`${s.wrapRelative} ${isWideScreen ? s.wrapRelative_wide : ''}`}>
                <div className={s.content}>{children}</div>
                <div ref={closeBtnRef} className={s.icon}>
                    <SvgSelector id='close' />
                </div>
            </div>
        </div>
    )
}

export default Popup
