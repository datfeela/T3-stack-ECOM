import { ClippedContainer } from '~/modules/shared/components/ClippedContainer/ClippedContainer'
import s from './Tags.module.scss'
import { useMatchMedia } from '~/modules/shared/hooks/useMatchMedia'
import { WrapWithExpand } from '~/modules/shared/components/WrapWithExpand/WrapWithExpand'
import { useEffect, useState } from 'react'

interface TagsProps {
    features?: string[]
    tags?: string[]
}

export const Tags = ({ features, tags }: TagsProps) => {
    const matchMedia = useMatchMedia()

    const [isExpandEnabled, setIsExpandEnabled] = useState(undefined as boolean | undefined)
    useEffect(() => {
        if (!matchMedia) return

        if (isExpandEnabled === undefined)
            setIsExpandEnabled(matchMedia.isMore1200 || matchMedia.isMore1440)

        if (isExpandEnabled === false && (matchMedia.isMore1200 || matchMedia.isMore1440))
            setIsExpandEnabled(true)

        if (isExpandEnabled === true && !matchMedia.isMore1200 && !matchMedia.isMore1440)
            setIsExpandEnabled(false)
    }, [matchMedia, isExpandEnabled])

    return (
        <ClippedContainer
            clipSize='md'
            height={matchMedia && (matchMedia.isMore1200 || matchMedia.isMore1440) ? 'full' : 'fit'}
        >
            <WrapWithExpand isEnabled={isExpandEnabled}>
                <div className={s.wrap}>
                    {features && features.length > 0 ? (
                        <div className={s.wrapInner}>
                            <div className={s.title}>Features</div>
                            <div className={s.items}>
                                {features?.map((feat, id) => (
                                    <div key={id} className={s.item}>
                                        <span></span>
                                        <div>{feat}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                    {tags && tags.length > 0 ? (
                        <div className={s.wrapInner}>
                            <div className={s.title}>Tags</div>
                            <div className={s.items}>
                                {tags?.map((tag, id) => (
                                    <div key={id} className={s.item}>
                                        <span></span>
                                        <div>{tag}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </WrapWithExpand>
        </ClippedContainer>
    )
}
