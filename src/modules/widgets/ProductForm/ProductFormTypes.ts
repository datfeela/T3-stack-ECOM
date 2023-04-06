import type { z } from 'zod'
import type { filtersSchema } from '~/modules/shared/lib/validationSchemas'
import type {
    addProductValidationSchema,
    editProductValidationSchema,
    formikAddProductValidationSchema,
} from './lib/validationSchemas'

export type ProductFiltersToApi = z.infer<typeof filtersSchema>
export type SubmitFormProps = z.infer<typeof formikAddProductValidationSchema>

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
