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
    // todo: Object.keys
    const mainFieldsEntries = Object.entries(mainFields) as [keyof typeof mainFields, string][]
    const mainInputs = mainFieldsEntries.map((entry) => {
        const [inputName, inputValue] = entry

        const props: InputProps = {
            name: inputName,
            touched: touched[inputName] as boolean,
            errors:
                errors[inputName] && touched[inputName] ? (errors[inputName] as string) : undefined,
            title: inputName,
        }

        switch (inputName) {
            case 'name':
                props.title = 'Name (required)'
                props.type = 'textarea'
                props.rows = '3'
                break
            case 'price':
                props.title = 'price (required)'
                props.placeholder = '1999'
                props.inputMode = 'numeric'
                break
            case 'quantityInStock':
                props.inputMode = 'numeric'
                props.title = 'Quantity in stock (required)'
                break
            case 'desc':
                props.type = 'textarea'
                props.rows = '4'
                props.title = 'description'
                break
            case 'priceWithoutDiscount':
                props.inputMode = 'numeric'
                props.placeholder = '1999'
                break
            case 'ytTrailerPath':
                props.title = 'Youtube trailer id'
                props.placeholder =
                    'dQw4w9WgXcQ for "https://www.youtube.com/watch?v=dQw4w9WgXcQ" link'
                break
            case 'ytGameplayTrailerPath':
                props.title = 'Youtube gameplay trailer id'
                props.placeholder =
                    'dQw4w9WgXcQ for "https://www.youtube.com/watch?v=dQw4w9WgXcQ" link'
                break
            case 'releaseDate':
                props.title = 'Release date (required)'
                props.type = 'date'
                break
            default:
                break
        }

        return <Input key={`addProductInput${inputName}`} {...props} />
    })

    return <>{mainInputs}</>
}
