/* eslint-disable @typescript-eslint/restrict-plus-operands */
import s from './Input.module.scss'
import type { CustomInputProps } from './InputTypes'

export const CustomInput: React.FC<CustomInputProps> = ({
    name,
    inputTitle,
    errors,
    extraClassName,
    touched,
    type,
    changeHandler,
    view = 'default',
    size = 'default',
    withBg,
    withMargin,
    ...props
}) => {
    let inputClassname = s.input

    inputClassname += view === 'blackWhite' ? ' ' + s.input_blackWhite : ''
    inputClassname += type === 'textarea' ? ' ' + s.textarea : ''

    inputClassname += touched ? ' ' + s.input_touched : ''
    inputClassname += errors ? ' ' + s.input_error : ''

    inputClassname += size === 'sm' ? ' ' + s.input_sm : ''
    inputClassname += withBg === false ? ' ' + s.input_noBg : ''
    inputClassname += withMargin === false ? ' ' + s.input_noMargin : ''

    inputClassname += extraClassName ? ' ' + extraClassName : ''

    let inputWrapClassname = s.inputWrap
    inputWrapClassname += view === 'blackWhite' ? ' ' + s.inputWrap_blackWhite : ''
    inputWrapClassname += size === 'sm' ? ' ' + s.inputWrap_sm : ''
    inputWrapClassname += withMargin === false ? ' ' + s.inputWrap_noMargin : ''

    return (
        <div className={inputWrapClassname}>
            {inputTitle && <span className={`${s.title} ${s.title_md}`}>{inputTitle}</span>}
            <input
                name={name}
                className={inputClassname}
                type={type && type !== 'textarea' ? type : 'text'}
                {...props}
                onChange={(e) => {
                    changeHandler(e.currentTarget.value)
                }}
            />
            <div className={s.error}>{errors ? errors : ''}</div>
        </div>
    )
}
