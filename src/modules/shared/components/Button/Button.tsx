/* eslint-disable @typescript-eslint/restrict-plus-operands */
import type { DefaultColor } from '../../types/types'
import { ClippedContainer } from '../ClippedContainer/ClippedContainer'
import { SvgSelector } from '../SvgSelector/SvgSelector'
import s from './Button.module.scss'
import type { ComponentProps, ElementType } from 'react'

interface ButtonProps<El extends ElementType = ElementType> {
    children: React.ReactNode
    isSubmitting?: boolean
    isError?: boolean
    element?: El
    // visual customization
    color?: DefaultColor
    width?: 'sm' | 'default' | 'wide' | 'full'
    height?: 'xs' | 'sm' | 'default' | 'lg'
    fontW?: '400' | '500' | '600' | '700'
    fontSize?: 'default' | 'md' | 'lg'
    withDecorative?: boolean
    isGlitching?: boolean
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
    color = 'yellow',
    fontSize,
    fontW = '600',
    width,
    height,
    shouldIconDisplay,
    element,
    withDecorative,
    isGlitching = true,
    ...props
}: ButtonPropsWithBase<El>) => {
    const TagName = element || defaultElement
    let clName = `${s.button}`

    // utility
    isError && (clName += ' ' + s.button_error)
    isSubmitting && (clName += ' ' + s.button_submitting)

    // color & sizes
    switch (color) {
        case 'red':
            clName += ' ' + s.button_red
            break
        case 'blue':
            clName += ' ' + s.button_blue
            break
        case 'purple':
            clName += ' ' + s.button_purple
            break
        default:
            clName += ' ' + s.button_yellow
            break
    }
    switch (fontW) {
        case '500':
            clName += ' ' + s.font_500
            break
        case '600':
            clName += ' ' + s.font_600
            break
        case '700':
            clName += ' ' + s.font_700
            break
        default:
            break
    }
    width === 'full' && (clName += ' ' + s.button_fullWidth)
    width === 'wide' && (clName += ' ' + s.button_wide)
    width === 'sm' && (clName += ' ' + s.button_small)
    height === 'xs' && (clName += ' ' + s.button_xsHeight)
    height === 'sm' && (clName += ' ' + s.button_smHeight)
    height === 'lg' && (clName += ' ' + s.button_lgHeight)
    fontSize === 'md' && (clName += ' ' + s.button_fontMd)
    fontSize === 'lg' && (clName += ' ' + s.button_fontLg)

    // display change
    withIcon && (clName += ' ' + s.button_withIcon)
    !shouldIconDisplay && (clName += ' ' + s.button_withIcon_hidden)
    withDecorative && (clName += ' ' + s.button_withDecorative)
    isGlitching && (clName += ' ' + s.button_withGlitch)

    return (
        <div className={s.wrap}>
            <ClippedContainer
                width={width === 'full' ? 'full' : 'fit'}
                clipSize='sm'
                corners={{
                    topRight: withDecorative ? false : true,
                    botLeft: true,
                }}
                borders={false}
            >
                <TagName {...props} className={clName}>
                    <span>{children}</span>
                    {shouldIconDisplay ? <div className={s.iconWrap}>{Icon}</div> : null}
                    {withDecorative ? (
                        <div className={s.iconDecorative}>
                            <SvgSelector id='buttonDecorative' />
                        </div>
                    ) : null}
                </TagName>
            </ClippedContainer>
            {/* shadow */}
            {isGlitching ? (
                <div className={s.shadow}>
                    <TagName {...props} className={`${clName} ${s.buttonGlitch}`}>
                        <span>{children}</span>
                        {shouldIconDisplay ? <div className={s.iconWrap}>{Icon}</div> : null}
                        {withDecorative ? (
                            <div className={s.iconDecorative}>
                                <SvgSelector id='buttonDecorative' />
                            </div>
                        ) : null}
                    </TagName>
                </div>
            ) : null}
        </div>
    )
}
