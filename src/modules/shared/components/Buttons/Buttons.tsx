/* eslint-disable @typescript-eslint/restrict-plus-operands */
import s from './Buttons.module.scss'

interface ButtonPropsBase extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    isSubmitting: boolean
    isError: boolean
    // visual customization
    color?: 'yellow' | 'red' | 'blue' | 'purple'
    size?: 'default' | 'wide'
    // HTMLButtonElement props
    type?: 'button' | 'reset' | 'submit'
}

interface ButtonWithoutIconProps extends ButtonPropsBase {
    withIcon: false
    Icon: undefined
    shouldIconDisplay: undefined
}

interface ButtonWithIconProps extends ButtonPropsBase {
    withIcon: true
    Icon: React.ReactNode
    shouldIconDisplay: boolean
}

export type ButtonDefaultProps = ButtonWithoutIconProps | ButtonWithIconProps

export const ButtonDefault = ({
    isSubmitting,
    isError,
    children,
    withIcon,
    Icon,
    color,
    size,
    shouldIconDisplay,
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

    return (
        <button {...props} className={clName} disabled={isError || isSubmitting ? true : false}>
            {children}
            {shouldIconDisplay ? <div className={s.iconWrap}>{Icon}</div> : null}
        </button>
    )
}
