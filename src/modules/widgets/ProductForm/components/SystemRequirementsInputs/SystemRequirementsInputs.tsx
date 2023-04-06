import type { FormikErrors, FormikTouched } from 'formik'
import { Input } from '~/modules/shared/components/Inputs/Input'
import type { SystemRequirementsFields } from '../../ProductFormTypes'
import s from './SystemRequirementsInputs.module.scss'

export interface SystemRequirementsInputsProps {
    name: string
    fields: SystemRequirementsFields
    touched: FormikTouched<SystemRequirementsFields> | undefined
    errors: FormikErrors<SystemRequirementsFields> | undefined
}

export const SystemRequirementsInputs = ({
    name,
    fields,
    errors,
    touched,
}: SystemRequirementsInputsProps) => {
    const inputs = fields
        ? Object.keys(fields).map((fieldName) => {
              const fieldNameTyped = fieldName as keyof SystemRequirementsFields
              const inputName = `${name}[${fieldNameTyped}]`
              let title: undefined | string

              switch (fieldNameTyped) {
                  case 'freeSpace':
                      title = 'free space'
                      break
                  case 'operatingSystem':
                      title = 'operating system'
                      break
                  case 'soundHardware':
                      title = 'sound hardware'
                      break
                  default:
                      title = fieldNameTyped
                      break
              }

              return (
                  <Input
                      key={inputName}
                      name={inputName}
                      title={title}
                      type='textarea'
                      rows='4'
                      errors={errors && errors[fieldNameTyped]}
                      touched={touched && touched[fieldNameTyped]}
                  />
              )
          })
        : null

    return <div>{inputs}</div>
}
