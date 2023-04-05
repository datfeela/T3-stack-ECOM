import { ProductCharacteristic } from '@prisma/client'
import s from './Description.module.scss'
import { ClippedContainer } from '~/modules/shared/components/ClippedContainer/ClippedContainer'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { isWrapHigherThanChildrenElements } from '~/modules/shared/lib/isWrapHigherThanChildrenElements'
import debounce from 'lodash.debounce'

export interface DescriptionProps {
    desc: string | null
    characteristics: ProductCharacteristic[]
}

export const Description = ({ desc, characteristics: chars }: DescriptionProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isWrapHigherThanContent, setIsWrapHigherThanContent] = useState(false)

    const wrapperRef = useRef<HTMLDivElement>(null)

    const updateIsWrapHigherThanContent = () => {
        if (!wrapperRef.current) return

        const isWrapHigher = isWrapHigherThanChildrenElements({
            wrapEl: wrapperRef.current,
            children: wrapperRef.current?.children,
        })

        setIsWrapHigherThanContent(isWrapHigher)
    }

    useLayoutEffect(() => {
        updateIsWrapHigherThanContent()

        const debouncedUpdater = debounce(updateIsWrapHigherThanContent, 350)

        window.addEventListener('resize', debouncedUpdater)
        return () => {
            window.removeEventListener('resize', debouncedUpdater)
        }
    })

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
