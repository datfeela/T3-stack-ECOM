/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Field } from 'formik'
import s from './Input.module.scss'
import type { InputProps } from './InputTypes'
import { SvgSelector } from '../SvgSelector/SvgSelector'

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
        const id = `checkbox_${name}_${value}`

        return (
            <div>
                <Field type='checkbox' id={id} className={s.checkbox} name={name} value={value} />
                <label htmlFor={id} className={s.checkboxWrap}>
                    <div className={s.checkboxIcon}>
                        <SvgSelector id='checkboxTick' />
                    </div>
                    <span>{title || name}</span>
                </label>
            </div>
        )
    }

    if (type === 'radio') {
        if (!radioOptions) return null
        return (
            <div className={s.radioWrap} role='group'>
                {radioOptions.map((value, radioId) => {
                    const id = `radio_${name}_${value}_${radioId}`
                    return (
                        <div key={radioId}>
                            <Field
                                type='radio'
                                id={id}
                                className={s.checkbox}
                                name={name}
                                value={value}
                            />
                            <label htmlFor={id} className={s.checkboxWrap}>
                                <div className={s.checkboxIcon}>
                                    <SvgSelector id='checkboxTick' />
                                </div>
                                <span>{value}</span>
                            </label>
                        </div>
                    )
                })}
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
