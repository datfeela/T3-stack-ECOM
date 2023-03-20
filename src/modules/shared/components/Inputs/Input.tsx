/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Field } from 'formik'
import s from './Input.module.scss'
import type { InputProps } from './InputInterface'

export const Input: React.FC<InputProps> = ({
    name,
    title,
    errors,
    extraClassName,
    touched,
    type,
    ...props
}) => {
    let inputClassname = s.input
    inputClassname += type === 'textarea' ? ' ' + s.textarea : ''
    inputClassname += type === 'date' ? ' ' + s.date : ''
    inputClassname += touched ? ' ' + s.input_touched : ''
    inputClassname += errors ? ' ' + s.input_error : ''
    inputClassname += extraClassName ? ' ' + extraClassName : ''

    if (type === 'checkbox') {
        return (
            <div className={s.checkboxWrap}>
                <Field name={name} className={s.checkbox} type={type} {...props} />
                <span>{props.placeholder}</span>
            </div>
        )
    }

    return (
        <div className={s.inputWrap}>
            {title && <span className={s.title}>{title}</span>}
            <Field
                name={name}
                component={type === 'textarea' ? type : 'input'}
                className={inputClassname}
                type={type && type !== 'textarea' ? type : 'text'}
                {...props}
            />
            <div className={s.error}>{errors ? errors : ''}</div>
        </div>
    )
}
