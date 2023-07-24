import { useState } from 'react'
import s from './ExpandBlock.module.scss'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'

interface ExpandBlockProps {
    isActive: boolean
    title: string
    children: React.ReactNode
}

export const ExpandBlock = ({ title, isActive, children }: ExpandBlockProps) => {
    const [isExpanded, setIsExpanded] = useState(true)

    return (
        <div
            className={`${s.wrap} ${isActive ? s.wrap_active : ''} ${
                isExpanded ? s.wrap_expanded : ''
            }`}
        >
            <div
                className={s.header}
                onClick={() => {
                    setIsExpanded(!isExpanded)
                }}
            >
                <span className={s.title}>{title}</span>
                <SvgSelector id='arrowExpand' />
            </div>

            <div className={s.itemsWrapOuter}>
                <div className={s.itemsWrapInner}>
                    <div className={s.items}>{children}</div>
                </div>
            </div>
        </div>
    )
}
