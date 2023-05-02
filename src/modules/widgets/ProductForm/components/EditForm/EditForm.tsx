import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { WithLoader } from '~/modules/shared/components/WrapWithLoader/WrapWithLoader'
import { ProductForm } from '../ProductForm/ProductForm'
import { UseEditProduct } from '../../hooks/useEditProduct'
import { useEditFormInitialValues } from '../../hooks/useEditFormInitialValues'

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

    return (
        <>
            <h1>Edit product</h1>
            {serverSuccess ? <div>REFACTOR ME PLS: {serverSuccess}</div> : null}
            <WithLoader loaderType='dots' conditionToShowLoader={!isLoaded}>
                <ProductForm
                    isSubmitting={isSubmitting}
                    submitForm={handleFormSubmit}
                    serverError={serverError}
                    initialValues={initialValues}
                    isEditForm={true}
                />
            </WithLoader>
        </>
    )
}
