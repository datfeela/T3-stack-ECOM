import s from './AddReviewForm.module.scss'
import { Form, Formik, type FormikProps } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { addReviewValidationSchema } from '~/modules/shared/lib/validationSchemas'
import { Input } from '~/modules/shared/components/Inputs/Input'
import { ButtonDefault } from '~/modules/shared/components/Button/Button'
import { LikeIcon } from '../LikeIcon/LikeIcon'
import { useEffect, useRef } from 'react'
import { useAddReview } from '../../hooks/useAddReview'

interface AddReviewFormProps {
    isActive: boolean
    productId: string
    quantityToGetOnSuccess: number
}

export const AddReviewForm = ({
    isActive,
    productId,
    quantityToGetOnSuccess,
}: AddReviewFormProps) => {
    const { isSubmitting, serverError, isServerSuccess, setIsServerSuccess, handleAddReview } =
        useAddReview({ productId, quantityToGetOnSuccess })

    const formikRef =
        useRef<FormikProps<{ productId: string; rating: number; message: string }>>(null)

    useEffect(() => {
        if (!isServerSuccess) return
        formikRef.current?.resetForm()
        setIsServerSuccess(false)
    }, [isServerSuccess])

    if (!isActive) return null

    const initialFormValues = {
        productId: productId,
        rating: 1,
        message: '',
    }

    return (
        <>
            <Formik
                initialValues={initialFormValues}
                validationSchema={toFormikValidationSchema(addReviewValidationSchema)}
                onSubmit={(values) => {
                    for (const keyAny in values) {
                        const key = keyAny as keyof typeof values
                        let value = values[key]
                        if (typeof value === 'string') {
                            value = value.trim()
                        }
                    }
                    handleAddReview(values)
                }}
                innerRef={formikRef}
            >
                {({ errors, touched, setFieldValue, values }) => {
                    return (
                        <Form className={s.wrap}>
                            <div className={s.inputsWrap}>
                                <Input
                                    name='message'
                                    title=''
                                    type='textarea'
                                    rows='4'
                                    placeholder='What do you think about this game?'
                                    color='purple'
                                    touched={touched.message}
                                    errors={errors.message}
                                />
                                <button
                                    type='button'
                                    onClick={() => {
                                        setFieldValue('rating', values.rating === 1 ? 0 : 1)
                                    }}
                                >
                                    <LikeIcon
                                        color={values.rating === 1 ? 'blue' : 'red'}
                                        isReversed={values.rating === 0}
                                        size='md'
                                    />
                                </button>
                            </div>
                            {serverError ? <div>{serverError}</div> : null}
                            <ButtonDefault
                                disabled={isSubmitting || !!serverError}
                                type='submit'
                                color='purple'
                                fontW='600'
                            >
                                add review
                            </ButtonDefault>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}
