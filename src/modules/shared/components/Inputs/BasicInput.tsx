/* eslint-disable @typescript-eslint/restrict-plus-operands */
import s from './Input.module.scss'
import type { BasicInputProps } from './InputInterface'

export const BasicInput: React.FC<BasicInputProps> = ({
    name,
    title,
    errors,
    extraClassName,
    touched,
    type,
    changeHandler,
    ...props
}) => {
    let inputClassname = s.input
    inputClassname += type === 'textarea' ? ' ' + s.textarea : ''
    inputClassname += touched ? ' ' + s.input_touched : ''
    inputClassname += errors ? ' ' + s.input_error : ''
    inputClassname += extraClassName ? ' ' + extraClassName : ''

    return (
        <div className={s.inputWrap}>
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
