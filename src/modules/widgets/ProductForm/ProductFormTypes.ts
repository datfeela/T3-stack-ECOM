import type { z } from 'zod'
import type {} from '~/modules/shared/lib/validationSchemas'
import type {
    addProductValidationSchema,
    editProductValidationSchema,
    formikAddProductValidationSchema,
    formikFiltersSchema,
} from './lib/validationSchemas'

export type SubmitFormProps = z.infer<typeof formikAddProductValidationSchema>
export type ProductFiltersFormik = z.infer<typeof formikFiltersSchema>

export type AddProductProps = z.infer<typeof addProductValidationSchema>
export type EditProductProps = z.infer<typeof editProductValidationSchema>

export interface ProductFormProps {
    submitForm: (props: SubmitFormProps) => void
    serverError?: string
    initialValues?: SubmitFormProps
    isEditForm?: boolean
    isSubmitting: boolean
}

export interface SystemRequirementsFields {
    soundHardware?: string | null | undefined
    operatingSystem: string
    cpu: string
    gpu: string
    memory: string
    freeSpace: string
}
