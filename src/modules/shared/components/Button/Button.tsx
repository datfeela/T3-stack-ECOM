/* eslint-disable @typescript-eslint/restrict-plus-operands */
import type { DefaultColor } from '../../types/types'
import s from './Button.module.scss'
import type { ComponentProps, ElementType } from 'react'

interface ButtonProps<El extends ElementType = ElementType> {
    children: React.ReactNode
    isSubmitting?: boolean
    isError?: boolean
    element?: El
    // visual customization
    color?: DefaultColor
    size?: 'default' | 'wide' | 'small'
    fontW?: '400' | '500' | '700'
}

interface ButtonWithoutIconProps<El extends ElementType> extends ButtonProps<El> {
    withIcon?: false
    Icon?: undefined
    shouldIconDisplay?: undefined
}

interface ButtonWithIconProps<El extends ElementType> extends ButtonProps<El> {
    withIcon: true
    Icon: React.ReactNode
    shouldIconDisplay: boolean
}

type ButtonDefaultProps<El extends ElementType> =
    | ButtonWithoutIconProps<El>
    | ButtonWithIconProps<El>

export type ButtonPropsWithBase<El extends ElementType> = ButtonDefaultProps<El> &
    Omit<ComponentProps<El>, keyof ButtonProps>

const defaultElement = 'button'

export const ButtonDefault = <El extends ElementType = typeof defaultElement>({
    isSubmitting,
    isError,
    children,
    withIcon,
    Icon,
    color,
    fontW,
    size,
    shouldIconDisplay,
    element,
    ...props
}: ButtonPropsWithBase<El>) => {
    const TagName = element || defaultElement
    let clName = `${s.button}`

    isError && (clName += ' ' + s.button_error)
    isSubmitting && (clName += ' ' + s.button_submitting)
    withIcon && (clName += ' ' + s.button_withIcon)
    size === 'wide' && (clName += ' ' + s.button_wide)
    size === 'small' && (clName += ' ' + s.button_small)
    !shouldIconDisplay && (clName += ' ' + s.button_withIcon_hidden)

    switch (color) {
        case 'red':
            clName += ' ' + s.button_red
            break
        case 'blue':
            clName += ' ' + s.button_blue
            break
        case 'yellow':
            clName += ' ' + s.button_yellow
            break
        default:
            clName += ' ' + s.button_purple
            break
    }

    switch (fontW) {
        case '500':
            clName += ' ' + s.font_500
            break
        case '700':
            clName += ' ' + s.font_700
            break
        default:
            break
    }

    return (
        <TagName {...props} className={clName}>
            {children}
            {shouldIconDisplay ? <div className={s.iconWrap}>{Icon}</div> : null}
        </TagName>
    )
}
