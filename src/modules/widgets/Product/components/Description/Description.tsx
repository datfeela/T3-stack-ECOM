import { ProductCharacteristic } from '@prisma/client'
import s from './Description.module.scss'
import { ClippedContainer } from '~/modules/shared/components/ClippedContainer/ClippedContainer'
import { useState } from 'react'

export interface DescriptionProps {
    desc: string | null
    characteristics: ProductCharacteristic[]
}

export const Description = ({ desc, characteristics: chars }: DescriptionProps) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <>
            <ClippedContainer clipSize='md' height='full'>
                <div className={`${s.wrap} ${isExpanded ? s.wrap_expanded : ''}`}>
                    <div className={s.title}>Game overview</div>
                    <div className={s.text}>{desc}</div>
                    {chars.map(({ name, value }, id) => (
                        <div key={id}>
                            <div className={s.title}>{name}</div>
                            <div className={s.text}>{value}</div>
                        </div>
                    ))}
                    <div className={s.expandBtnWrap}>
                        <div
                            className={s.expandBtn}
                            onClick={() => {
                                setIsExpanded(!isExpanded)
                            }}
                        >
                            {isExpanded ? 'hide' : 'expand'}
                        </div>
                    </div>
                </div>
            </ClippedContainer>
        </>
    )
}
