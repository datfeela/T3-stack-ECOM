import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { WithLoader } from '~/modules/shared/components/WrapWithLoader/WrapWithLoader'
import { ProductForm } from '../ProductForm/ProductForm'
import { UseEditProduct } from '../../hooks/useEditProduct'
import { useEditFormInitialValues } from '../../hooks/useEditFormInitialValues'
import type { SubmitFormProps } from '../../ProductFormTypes'

export const EditForm = () => {
    const router = useRouter()
    const { pid, addSuccess } = router.query
    const productId = typeof pid === 'string' ? pid : '0'

    // set server success from url, if redirected from add success
    useEffect(() => {
        if (addSuccess === 'true') setServerSuccess('Product added succesfully!')
    }, [addSuccess])

    const { initialValues, isLoaded } = useEditFormInitialValues(productId)

    const { isSubmitting, serverError, serverSuccess, setServerSuccess, handleFormSubmit } =
        UseEditProduct(productId)

    const resetServerSuccess = () => {
        setServerSuccess('')
    }

    return (
        <>
            <h1>Edit product</h1>
            <WithLoader loaderType='dots' conditionToShowLoader={!isLoaded}>
                <ProductForm
                    isSubmitting={isSubmitting}
                    submitForm={async (props: SubmitFormProps) => {
                        await handleFormSubmit({ ...props, initialValues })
                    }}
                    serverError={serverError}
                    serverSuccess={serverSuccess}
                    resetServerSuccess={resetServerSuccess}
                    initialValues={initialValues}
                    isEditForm={true}
                />
            </WithLoader>
        </>
    )
}
