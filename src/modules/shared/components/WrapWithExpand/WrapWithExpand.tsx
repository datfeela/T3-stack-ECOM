import { useEffect, useRef, useState } from 'react'
import s from './WrapWithExpand.module.scss'
import { useIsWrapHigherThanContent } from '../../hooks/useIsWrapHigherThanContent'

interface WrapWithExpandProps {
    children: React.ReactNode
    btnExpandText?: string
    btnHideText?: string
    minHeight?: string
    isEnabled?: boolean
}

export const WrapWithExpand = ({
    children,
    btnExpandText = 'Read more',
    btnHideText = 'Hide',
    minHeight,
    isEnabled,
}: WrapWithExpandProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const isWrapHigherThanContent = useIsWrapHigherThanContent(wrapperRef)

    if (isEnabled === false) return <>{children}</>

    return (
        <>
            <div
                ref={wrapperRef}
                className={`${s.wrap} ${isExpanded ? s.wrap_expanded : ''} ${
                    isWrapHigherThanContent ? s.wrap_noOverflow : ''
                }`}
                style={minHeight ? { minHeight } : undefined}
            >
                {children}
            </div>
            {!isWrapHigherThanContent || (isWrapHigherThanContent && isExpanded) ? (
                <div className={s.expandBtnWrap}>
                    <div
                        className={s.expandBtn}
                        onClick={() => {
                            setIsExpanded(!isExpanded)
                        }}
                    >
                        {isExpanded ? btnHideText : btnExpandText}
                    </div>
                </div>
            ) : null}
        </>
    )
}
