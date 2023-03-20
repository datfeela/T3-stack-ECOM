import type { FormikErrors, FormikTouched } from 'formik'

export interface DynamicInputProps {
    title?: string
    name: string
    fields: number[] | string[] | { name: string; value: string }[]
    errors:
        | string
        | string[]
        | FormikErrors<{
              name: string
              value: string
          }>[]
        | undefined
    touched:
        | FormikTouched<{
              name: string
              value: string
          }>[]
        | boolean
        | undefined
    newFieldKeys?: string[]
}

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
    name: string
    title?: string
    errors?: string
    touched?: boolean
    type?: string
    extraClassName?: string
    rows?: string
    isUserField?: boolean
}

export interface BasicInputProps extends InputProps {
    changeHandler: (input: string) => void
}
