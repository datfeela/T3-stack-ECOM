/* eslint-disable @typescript-eslint/restrict-plus-operands */
import s from './Buttons.module.scss'

interface ButtonPropsBase extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    handleClick?: (e: any) => void
    isSubmitting?: boolean
    isError?: boolean
    element?: 'span'
    // visual customization
    color?: 'yellow' | 'red' | 'blue' | 'purple'
    size?: 'default' | 'wide'
    fontW?: '400' | '500' | '700'
    // HTMLButtonElement props
    type?: 'button' | 'reset' | 'submit'
}

interface ButtonWithoutIconProps extends ButtonPropsBase {
    withIcon?: false
    Icon?: undefined
    shouldIconDisplay?: undefined
}

interface ButtonWithIconProps extends ButtonPropsBase {
    withIcon: true
    Icon: React.ReactNode
    shouldIconDisplay: boolean
}

export type ButtonDefaultProps = ButtonWithoutIconProps | ButtonWithIconProps

export const ButtonDefault = ({
    handleClick,
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
}: ButtonDefaultProps) => {
    let clName = `${s.button}`

    isError && (clName += ' ' + s.button_error)
    isSubmitting && (clName += ' ' + s.button_submitting)
    withIcon && (clName += ' ' + s.button_withIcon)
    size === 'wide' && (clName += ' ' + s.button_wide)
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

    if (element === 'span') {
        return (
            <span onClick={handleClick} {...props} className={clName}>
                {children}
                {shouldIconDisplay ? <div className={s.iconWrap}>{Icon}</div> : null}
            </span>
        )
    }

    return (
        <button
            onClick={handleClick}
            {...props}
            className={clName}
            disabled={isError || isSubmitting ? true : false}
        >
            {children}
            {shouldIconDisplay ? <div className={s.iconWrap}>{Icon}</div> : null}
        </button>
    )
}
