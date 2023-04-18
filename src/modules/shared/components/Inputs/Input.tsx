/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Field } from 'formik'
import s from './Input.module.scss'
import type { InputProps } from './InputTypes'

export const Input: React.FC<InputProps> = ({
    name,
    title,
    errors,
    extraClassName,
    touched,
    type,
    value,
    color,
    radioOptions,
    ...props
}) => {
    let inputClassname = s.input
    inputClassname += type === 'textarea' ? ' ' + s.textarea : ''
    inputClassname += type === 'date' ? ' ' + s.date : ''
    inputClassname += touched ? ' ' + s.input_touched : ''
    inputClassname += errors ? ' ' + s.input_error : ''

    switch (color) {
        case 'purple':
            inputClassname += ' ' + s.input_purple
            break
        case 'yellow':
            inputClassname += ' ' + s.input_yellow
            break
        default:
            break
    }

    inputClassname += extraClassName ? ' ' + extraClassName : ''

    if (type === 'checkbox') {
        return (
            <label className={s.checkboxWrap}>
                <Field type='checkbox' name={name} value={value} />
                {title || name}
            </label>
        )
    }

    if (type === 'radio') {
        if (!radioOptions) return null
        return (
            <div role='group'>
                {radioOptions.map((value, id) => (
                    <label key={id} className={s.checkboxWrap}>
                        <Field type='radio' name={name} value={value} />
                        {value}
                    </label>
                ))}
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
