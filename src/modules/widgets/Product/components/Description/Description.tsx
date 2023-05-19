import type { ProductCharacteristic } from '@prisma/client'
import s from './Description.module.scss'
import { ClippedContainer } from '~/modules/shared/components/ClippedContainer/ClippedContainer'
import { WrapWithExpand } from '~/modules/shared/components/WrapWithExpand/WrapWithExpand'
import { useMatchMedia } from '~/modules/shared/hooks/useMatchMedia'
import { useEffect } from 'react'

export interface DescriptionProps {
    desc: string | null
    characteristics: ProductCharacteristic[]
}

export const Description = ({ desc, characteristics: chars }: DescriptionProps) => {
    const matchMedia = useMatchMedia()

    return (
        <>
            <ClippedContainer clipSize='md' height='full'>
                <WrapWithExpand
                    minHeight={
                        matchMedia && (matchMedia.isLess480 || matchMedia.isMore480)
                            ? '384px'
                            : undefined
                    }
                >
                    <div className={s.wrap}>
                        <h3 className={s.title}>Game overview</h3>
                        <div className={s.text}>{desc}</div>
                        {chars.map(({ name, value }, id) => (
                            <div className={s.characteristic} key={id}>
                                <div className={s.subtitle}>{name}</div>
                                <div className={s.text}>{value}</div>
                            </div>
                        ))}
                    </div>
                </WrapWithExpand>
            </ClippedContainer>
        </>
    )
}
