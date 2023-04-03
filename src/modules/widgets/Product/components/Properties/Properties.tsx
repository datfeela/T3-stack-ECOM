import { ClippedContainer } from '~/modules/shared/components/ClippedContainer/ClippedContainer'
import type { Properties as TProperties } from '../../types/types'
import s from './Properties.module.scss'

export const Properties = (props: TProperties) => {
    const els = Object.entries(props).map(([name, value], id) => {
        const valueTyped = value as string | string[] | undefined

        return <Property key={id} name={name} value={valueTyped} />
    })

    return (
        <ClippedContainer clipSize='md'>
            <div className={s.filters}>{els}</div>
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
            <span className={s.filter__value}>
                {typeof value === 'object'
                    ? value.map((text, valueId) => (
                          <span key={valueId}>
                              {valueId > 0 ? ', ' : ''}
                              {text}
                          </span>
                      ))
                    : null}
                {typeof value === 'string' ? value : null}
            </span>
        </div>
    )
}
