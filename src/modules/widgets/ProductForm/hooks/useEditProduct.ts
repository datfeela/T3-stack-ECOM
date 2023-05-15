import { useState } from 'react'
import { api } from '~/modules/shared/api/apiTRPC'
import { mapProductDataToApi } from '../mappers/mapProductDataToApi'
import type { SubmitFormProps } from '../ProductFormTypes'
import type { mapProductDataFromApi } from '../mappers/mapProductDataFromApi'
import { handleImgDelete } from '../lib/handleImgDelete'

type HandleFormSubmitProps = SubmitFormProps & {
    initialValues:
        | (Omit<ReturnType<typeof mapProductDataFromApi>, 'detailPageImages'> & {
              detailPageImages: string[]
          })
        | undefined
}

export const UseEditProduct = (productId: string) => {
    const [serverError, setServerError] = useState('')
    const [serverSuccess, setServerSuccess] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const apiContext = api.useContext()

    const editProduct = api.products.editProduct.useMutation({
        onMutate: async () => {
            await apiContext.products.getProductById.cancel()
            const optimisticUpdate = apiContext.products.getProductById.getData()

            if (optimisticUpdate) {
                apiContext.products.getProductById.setData(productId, optimisticUpdate)
            }
        },
        onSettled: () => {
            setIsSubmitting(false)
        },
        onError: (e) => {
            setServerSuccess('')
            setServerError(e.message)
        },
        onSuccess: async () => {
            await apiContext.products.getProductById.invalidate()
            setServerSuccess('Product edited successfully!')
        },
    })

    const handleFormSubmit = async ({ initialValues, ...props }: HandleFormSubmitProps) => {
        try {
            console.log('submit', initialValues)

            if (initialValues) {
                const oldImages = [
                    initialValues.coverImage,
                    initialValues.verticalImage,
                    initialValues.horizontalImage,
                    ...initialValues.detailPageImages,
                ].filter((value) => typeof value === 'string' && value.length > 0) as string[]

                console.log([
                    initialValues.coverImage,
                    initialValues.verticalImage,
                    initialValues.horizontalImage,
                    ...initialValues.detailPageImages,
                ])

                const newImages = [
                    props.coverImage,
                    props.verticalImage,
                    props.horizontalImage,
                    ...props.detailPageImages,
                ].filter(
                    (value: string) => typeof value === 'string' && value.length > 0,
                ) as string[]

                const deletePromises = [] as Promise<{
                    data: any
                    error: any
                }>[]

                oldImages.forEach((src) => {
                    const isNotTouched = !!newImages.find((value) => value === src)
                    console.log(src, isNotTouched)

                    if (isNotTouched) return

                    const promise = handleImgDelete(src)
                    deletePromises.push(promise)
                })

                const res = await Promise.all(deletePromises)
                res.forEach(({ data, error }) => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    if (error) console.log(data.name, error)
                })
            }

            setIsSubmitting(true)
            setServerSuccess('')
            const newProductValues = await mapProductDataToApi(props)

            editProduct.mutate({ ...newProductValues, id: productId })
        } catch (e) {
            setIsSubmitting(false)
            throw e
        }
    }

    return {
        serverError,
        serverSuccess,
        setServerSuccess,
        isSubmitting,
        handleFormSubmit,
    }
}
