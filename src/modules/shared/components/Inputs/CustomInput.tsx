/* eslint-disable @typescript-eslint/restrict-plus-operands */
import s from './Input.module.scss'
import type { CustomInputProps } from './InputTypes'

export const CustomInput: React.FC<CustomInputProps> = ({
    name,
    title,
    errors,
    extraClassName,
    touched,
    type,
    changeHandler,
    view,
    ...props
}) => {
    let inputClassname = s.input
    inputClassname += type === 'textarea' ? ' ' + s.textarea : ''
    inputClassname += touched ? ' ' + s.input_touched : ''
    inputClassname += errors ? ' ' + s.input_error : ''
    inputClassname += extraClassName ? ' ' + extraClassName : ''
    inputClassname += view === 'blackWhite' ? ' ' + s.input_blackWhite : ''

    return (
        <div className={`${s.inputWrap} ${view === 'blackWhite' ? s.inputWrap_blackWhite : ''}`}>
            {title && <span className={s.title}>{title}</span>}
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
