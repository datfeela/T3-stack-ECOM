import type { FormikErrors, FormikTouched } from 'formik'
import { Input } from '~/modules/shared/components/Inputs/Input'
import type { InputProps } from '~/modules/shared/components/Inputs/InputTypes'

interface MainInputsValues {
    name: string
    price: string
    priceWithoutDiscount: string
    quantityInStock: string
    desc: string
    ytTrailerPath: string
    ytGameplayTrailerPath: string
    releaseDate: string
}

interface MainInputsProps {
    mainFields: MainInputsValues
    touched: FormikTouched<MainInputsValues>
    errors: FormikErrors<MainInputsValues>
}

// basic 1 field inputs w/ validation

export const MainInputs = ({ mainFields, errors, touched }: MainInputsProps) => {
    const mainFieldsEntries = Object.keys(mainFields) as (keyof typeof mainFields)[]
    const mainInputs = mainFieldsEntries.map((inputName) => {
        const props: InputProps = {
            name: inputName,
            touched: touched[inputName] as boolean,
            errors:
                errors[inputName] && touched[inputName] ? (errors[inputName] as string) : undefined,
            inputTitle: inputName,
        }

        switch (inputName) {
            case 'name':
                props.inputTitle = 'Name (required)'
                props.type = 'textarea'
                props.rows = '3'
                break
            case 'price':
                props.inputTitle = 'price (required)'
                props.placeholder = '0'
                props.inputMode = 'numeric'
                break
            case 'quantityInStock':
                props.inputMode = 'numeric'
                props.inputTitle = 'Quantity in stock (required)'
                break
            case 'desc':
                props.type = 'textarea'
                props.rows = '4'
                props.inputTitle = 'description'
                break
            case 'priceWithoutDiscount':
                props.inputMode = 'numeric'
                props.placeholder = '0'
                break
            case 'ytTrailerPath':
                props.inputTitle = 'Youtube trailer id (required)'
                props.placeholder =
                    'dQw4w9WgXcQ for "https://www.youtube.com/watch?v=dQw4w9WgXcQ" link'
                break
            case 'ytGameplayTrailerPath':
                props.inputTitle = 'Youtube gameplay trailer id'
                props.placeholder =
                    'dQw4w9WgXcQ for "https://www.youtube.com/watch?v=dQw4w9WgXcQ" link'
                break
            case 'releaseDate':
                props.inputTitle = 'Release date (required)'
                props.type = 'date'
                break
            default:
                break
        }

        return <Input key={`addProductInput${inputName}`} {...props} />
    })

    return <>{mainInputs}</>
}
