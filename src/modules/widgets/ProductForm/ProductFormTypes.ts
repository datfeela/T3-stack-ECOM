import type { z } from 'zod'
import type {
    formikAddProductValidationSchema,
    formikFiltersSchema,
} from '~/modules/shared/lib/validationSchemas'

export type SubmitFormProps = z.infer<typeof formikAddProductValidationSchema>

export type ProductFiltersFormik = z.infer<typeof formikFiltersSchema>

export interface ProductFormProps {
    submitForm: (props: SubmitFormProps) => void
    serverError?: string
    initialValues?: SubmitFormProps
    isEditForm?: boolean
}
