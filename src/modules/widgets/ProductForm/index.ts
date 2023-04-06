export { addProductValidationSchema, editProductValidationSchema } from './lib/validationSchemas'

export type {
    AddProductProps as AddProductInput,
    EditProductProps as EditProductInput,
} from './ProductFormTypes'

export { AddForm as AddProductForm } from './components/AddForm/AddForm'
export { EditForm as EditProductForm } from './components/EditForm/EditForm'
