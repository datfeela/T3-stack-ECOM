import s from './Summary.module.scss'
import { useSession } from 'next-auth/react'
import { Input } from '~/modules/shared/components/Inputs/Input'
import { Form, Formik } from 'formik'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { ButtonDefault } from '~/modules/shared/components/Button/Button'
import Link from 'next/link'
import { CircleLoader } from '~/modules/shared/components/Loaders/Loaders'

interface SummaryProps {
    handleSubmit: (email: string) => void
    totalPrice: number
    totalPriceWithoutDiscount: number | undefined
    isSubmitting: boolean
    error: string | null
}

export const Summary = ({
    handleSubmit,
    totalPrice,
    totalPriceWithoutDiscount,
    error,
    isSubmitting,
}: SummaryProps) => {
    const { data } = useSession()

    return (
        <div className={s.wrap}>
            <div className={s.title}>Summary</div>
            <div className={s.priceBlock}>
                <div className={s.price}>
                    <span>Price</span>
                    <div>
                        <span className={s.units}>Y.E </span>
                        <span className={s.num}>{totalPriceWithoutDiscount || totalPrice}</span>
                    </div>
                </div>
                {totalPriceWithoutDiscount ? (
                    <>
                        <div className={s.price}>
                            <span>Sale Discount</span>
                            <div>
                                <span className={s.units}>-Y.E </span>
                                <span className={s.num}>
                                    {totalPriceWithoutDiscount - totalPrice}
                                </span>
                            </div>
                        </div>
                        <div className={s.divider}></div>
                        <div className={`${s.price} ${s.price_subtotal}`}>
                            <span>Subtotal</span>
                            <div>
                                <span className={s.units}>Y.E </span>
                                <span className={s.num}>{totalPrice}</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={s.divider}></div>
                )}
            </div>
            <Formik
                initialValues={{ email: data?.user.email || '', agreement: false }}
                validateOnBlur={false}
                validationSchema={toFormikValidationSchema(
                    z.object({
                        email: z
                            .string({
                                required_error:
                                    'Please enter your email so we can deliver your order',
                            })
                            .email('Please enter valid email')
                            .min(3, 'Email minimal length is 3 symbols')
                            .max(40, 'Email maximal length is 40 symbols'),
                        agreement: z.boolean(),
                    }),
                )}
                onSubmit={({ email, agreement }) => {
                    if (agreement !== true) return
                    handleSubmit(email.trim())
                }}
                enableReinitialize
            >
                {({ errors, touched, values }) => {
                    return (
                        <Form className={s.form}>
                            <div className={s.input}>
                                <span>Enter your email to receive the order</span>
                                <Input
                                    name='email'
                                    placeholder='Email'
                                    touched={touched.email}
                                    errors={errors.email}
                                />
                            </div>
                            <div className={s.agreement}>
                                <Input name='agreement' type='checkbox' title=' ' />
                                <span>
                                    Lorem ipsum dolor sit amet consectetu with{' '}
                                    <Link href='/uterms'>Terms of Service</Link> and{' '}
                                    <Link href='/privacy'>Privacy Policy</Link>
                                </span>
                            </div>
                            {error ? <div className={s.error}>{error}</div> : null}
                            <div className={s.button}>
                                <ButtonDefault
                                    disabled={isSubmitting || !!error || !values.agreement}
                                    type='submit'
                                    color='yellow'
                                    fontSize='md'
                                    height='lg'
                                    withIcon={true}
                                    Icon={<CircleLoader />}
                                    shouldIconDisplay={isSubmitting}
                                >
                                    check out
                                </ButtonDefault>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
