import type { ProductCharacteristic } from '@prisma/client'
import s from './Description.module.scss'
import { ClippedContainer } from '~/modules/shared/components/ClippedContainer/ClippedContainer'
import { useRef, useState } from 'react'

import { useIsWrapHigherThanContent } from '../../hooks/useIsWrapHigherThanContent'

export interface DescriptionProps {
    desc: string | null
    characteristics: ProductCharacteristic[]
}

export const Description = ({ desc, characteristics: chars }: DescriptionProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)

    const isWrapHigherThanContent = useIsWrapHigherThanContent(wrapperRef)

    return (
        <>
            <ClippedContainer clipSize='md' height='full'>
                <div
                    ref={wrapperRef}
                    className={`${s.wrap} ${isExpanded ? s.wrap_expanded : ''} ${
                        isWrapHigherThanContent ? s.wrap_noOverflow : ''
                    }`}
                >
                    <div className={s.title}>Game overview</div>
                    <div className={s.text}>{desc}</div>
                    {chars.map(({ name, value }, id) => (
                        <div className={s.characteristic} key={id}>
                            <div className={s.subtitle}>{name}</div>
                            <div className={s.text}>{value}</div>
                        </div>
                    ))}
                </div>
                {!isWrapHigherThanContent || (isWrapHigherThanContent && isExpanded) ? (
                    <div className={s.expandBtnWrap}>
                        <div
                            className={s.expandBtn}
                            onClick={() => {
                                setIsExpanded(!isExpanded)
                            }}
                        >
                            {isExpanded ? 'Hide' : 'Read more'}
                        </div>
                    </div>
                ) : null}
            </ClippedContainer>
        </>
    )
}
