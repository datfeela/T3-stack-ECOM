import type { FormikErrors, FormikTouched } from 'formik'
import { Input } from '~/modules/shared/components/Inputs/Input'
import type { InputProps } from '~/modules/shared/components/Inputs/InputInterface'

interface MainInputsValues {
    name: string
    price: string
    priceWithoutDiscount: string
    desc: string
    ytTrailerPath: string
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

            default:
                break
        }

        if (inputName === 'desc') {
            props.type = 'textarea'
            props.rows = '4'
            props.title = 'description'
        }

        if (inputName === 'price') {
            props.inputMode = 'numeric'
        }

        if (inputName === 'ytTrailerPath') {
            props.title = 'Youtube trailer link'
        }

        if (inputName === 'releaseDate') {
            props.type = 'date'
        }

        return <Input key={`addProductInput${inputName}`} {...props} />
    })

    return <>{mainInputs}</>
}
