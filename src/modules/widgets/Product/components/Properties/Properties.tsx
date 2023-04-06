import { ClippedContainer } from '~/modules/shared/components/ClippedContainer/ClippedContainer'
import type { Platform, Properties as TProperties } from '../../types/types'
import s from './Properties.module.scss'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'

export const Properties = (props: TProperties) => {
    const { categories, releaseDate, developer, publisher, gamemodes, platforms } = props

    const els = Object.entries({
        developer,
        publisher,
        gamemodes,
        platforms,
    }).map(([name, value], id) => {
        return <Property key={id} name={name} value={value} />
    })

    return (
        <ClippedContainer clipSize='md'>
            <div className={s.filters}>
                <Property name='genre' value={categories} />
                <Property name='release' value={releaseDate} />
                {els}
            </div>
        </ClippedContainer>
    )
}

interface PropertyProps {
    name: string
    value: string | string[] | undefined
}

const Property = ({ name, value }: PropertyProps) => {
    return (
        <div className={s.filter}>
            <span className={s.filter__title}>{name}: </span>
            <div className={s.filter__value}>
                {typeof value === 'object' ? (
                    name === 'platforms' ? (
                        <div className={s.icons}>
                            {value.map((text, valueId) => {
                                return (
                                    <div key={valueId} className={s.icon}>
                                        <SvgSelector id={text as Platform} />
                                    </div>
                                )
                            })}{' '}
                        </div>
                    ) : (
                        value.map((text, valueId) => {
                            return (
                                <span key={valueId}>
                                    {valueId > 0 ? ', ' : ''}
                                    {text}
                                </span>
                            )
                        })
                    )
                ) : null}
                {typeof value === 'string' ? value : null}
            </div>
        </div>
    )
}
