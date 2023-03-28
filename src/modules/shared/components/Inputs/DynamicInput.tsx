/* eslint-disable @typescript-eslint/restrict-plus-operands */
import s from './Input.module.scss'
import { FieldArray } from 'formik'
import type { DynamicInputProps } from './InputTypes'
import { Input } from './Input'

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
            <span className={s.title}>{title || name}</span>
            <FieldArray name={name}>
                {({ push, remove }) => (
                    <>
                        {fields.map((field, id) => {
                            if (typeof field === 'string' || typeof field === 'number') {
                                return (
                                    <div key={`basic_input_${id}`}>
                                        <div className={s.inputEditable__wrap}>
                                            <Input name={`${name}[${id}]`} />
                                            <button
                                                onClick={() => {
                                                    remove(id)
                                                }}
                                            >
                                                remove field
                                            </button>
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
                                                                name={`${name}[${id}].${keyTyped}`}
                                                                placeholder={keyTyped}
                                                            />
                                                        )
                                                    }

                                                    return (
                                                        <Input
                                                            key={`complex_input_${idChild}`}
                                                            name={`${name}[${id}].${keyTyped}`}
                                                            placeholder={keyTyped}
                                                        />
                                                    )
                                                })}
                                            </div>
                                            <button
                                                onClick={() => {
                                                    remove(id)
                                                }}
                                            >
                                                remove field
                                            </button>
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
                        <button
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
                        </button>
                    </>
                )}
            </FieldArray>
        </div>
    )
}
