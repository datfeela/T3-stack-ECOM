/* eslint-disable @typescript-eslint/restrict-plus-operands */
import s from './Input.module.scss'
import { FieldArray } from 'formik'
import type { DynamicInputProps } from './InputTypes'
import { Input } from './Input'
import { ButtonDefault } from '../Button/Button'

export const DynamicInput: React.FC<DynamicInputProps> = ({
    title,
    name,
    fields,
    errors,
    touched,
    newFieldKeys,
}) => {
    return (
        <div className={s.inputWrap}>
            {title ? <span className={s.title}>{title}</span> : null}
            <FieldArray name={name}>
                {({ push, remove }) => (
                    <div className={s.inputEditable__wrapOuter}>
                        {fields.map((field, id) => {
                            if (typeof field === 'string' || typeof field === 'number') {
                                return (
                                    <div key={`basic_input_${id}`}>
                                        <div
                                            className={`${s.inputEditable__wrap} ${s.inputEditable__wrap_singleField}`}
                                        >
                                            <Input name={`${name}['${id}']`} />
                                            <ButtonDefault
                                                color='purple'
                                                width='sm'
                                                height='sm'
                                                isGlitching={false}
                                                type='button'
                                                onClick={() => {
                                                    remove(id)
                                                }}
                                            >
                                                Remove field
                                            </ButtonDefault>
                                        </div>
                                        {errors &&
                                            errors[id] &&
                                            touched &&
                                            typeof touched !== 'boolean' &&
                                            touched[id] && (
                                                <div className={s.error}>
                                                    {`Field can't be empty. Either fill or remove it`}
                                                </div>
                                            )}
                                    </div>
                                )
                            }
                            if (typeof field === 'object') {
                                return (
                                    <div key={`complex_inputs_wrap_${id}`}>
                                        <div className={s.inputEditable__wrap}>
                                            <div className={s.input_multifield}>
                                                {Object.keys(field).map((key, idChild) => {
                                                    const keyTyped = key as keyof typeof field

                                                    if (keyTyped === 'value') {
                                                        return (
                                                            <Input
                                                                key={`complex_input_${idChild}`}
                                                                type={'textarea'}
                                                                rows={'4'}
                                                                name={`${name}['${id}'].${keyTyped}`}
                                                                placeholder={keyTyped}
                                                            />
                                                        )
                                                    }

                                                    return (
                                                        <Input
                                                            key={`complex_input_${idChild}`}
                                                            name={`${name}['${id}'].${keyTyped}`}
                                                            placeholder={keyTyped}
                                                        />
                                                    )
                                                })}
                                            </div>
                                            <ButtonDefault
                                                color='purple'
                                                width='sm'
                                                isGlitching={false}
                                                type='button'
                                                onClick={() => {
                                                    remove(id)
                                                }}
                                            >
                                                Remove field
                                            </ButtonDefault>
                                        </div>
                                        {errors &&
                                            errors[id] &&
                                            touched &&
                                            typeof touched !== 'boolean' &&
                                            touched[id]?.name &&
                                            touched[id]?.value && (
                                                <div className={s.error}>
                                                    {`Field can't be empty. Either fill or remove it`}
                                                </div>
                                            )}
                                    </div>
                                )
                            }
                        })}
                        <div className={s.buttonAddNewField}>
                            <ButtonDefault
                                color='purple'
                                width='sm'
                                height='sm'
                                isGlitching={false}
                                type='button'
                                onClick={() => {
                                    if (newFieldKeys) {
                                        const newField = {} as { [key: string]: string }
                                        newFieldKeys?.forEach((key) => {
                                            newField[key] = ''
                                        })
                                        push(newField)
                                    }
                                    if (!newFieldKeys) {
                                        push('')
                                    }
                                }}
                            >
                                Add field
                            </ButtonDefault>
                        </div>
                    </div>
                )}
            </FieldArray>
        </div>
    )
}
