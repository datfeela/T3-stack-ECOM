import s from './ProductForm.module.scss'
import { Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'

import type { ProductFormProps } from '../../ProductFormTypes'

import { DynamicInput } from '~/modules/shared/components/Inputs/DynamicInput'

import ImageInput from '../ImageInput/ImageInput'
import { MainInputs } from '../MainInputs/MainInputs'
import { CategoriesInput } from '../CategoriesInput/CategoriesInput'
import { FiltersCheckboxes } from '../FiltersCheckboxes/FiltersCheckboxes'
import SubmitButton from '../SubmitButton/SubmitButton'
import { formikAddProductValidationSchema } from '../../lib/validationSchemas'
import { OriginalGameInput } from '../OriginalGameInput/OriginalGameInput'
import { SystemRequirementsInputs } from '../SystemRequirementsInputs/SystemRequirementsInputs'
import type { FilterName, ProductType } from '~/modules/shared/types/productTypes'
import { Input } from '~/modules/shared/components/Inputs/Input'
import { useCategoriesData } from '~/modules/shared/hooks/api/useCategoriesData'
import { useFiltersData } from '~/modules/shared/hooks/api/useFiltersData'
import { Divider } from '~/modules/shared/components/Divider/Divider'
import { MultiImageInput } from '../MultiImageInput/MultiImageInput'

export const ProductForm = ({
    initialValues,
    serverError,
    serverSuccess,
    resetServerSuccess,
    submitForm,
    isEditForm,
    isSubmitting,
}: ProductFormProps) => {
    // console.log(initialValues)

    // data for categories chekbox inputs initialize
    const categoriesData = useCategoriesData({ refetchOnWindowFocus: false })

    // data for filters checkbox inputs initialize
    const filtersData = useFiltersData({ refetchOnWindowFocus: false })?.filter(({ name }) => {
        return name !== 'publisher' && name !== 'developer' && name !== 'tags'
    })

    // initial form values
    const initialFormValues = {
        name: initialValues?.name || '',
        price: initialValues?.price || '',
        priceWithoutDiscount: initialValues?.priceWithoutDiscount || '',
        quantityInStock: initialValues?.quantityInStock || '',
        releaseDate: initialValues?.releaseDate || '2000-01-01',
        desc: initialValues?.desc || '',
        ytTrailerPath: initialValues?.ytTrailerPath || '',
        ytGameplayTrailerPath: initialValues?.ytGameplayTrailerPath || '',
        characteristics:
            initialValues?.characteristics || ([] as { name: string; value: string }[]),
        filters: {
            gamemodes: initialValues?.filters?.gamemodes || [],
            platforms: initialValues?.filters?.platforms || [],
            features: initialValues?.filters?.features || [],
            tags: initialValues?.filters?.tags || ([] as string[]),
            publisher: initialValues?.filters?.publisher || ([] as string[]),
            developer: initialValues?.filters?.developer || ([] as string[]),
        } as {
            [key in FilterName]: string[]
        },
        originalGameId: initialValues?.originalGameId || '',
        coverImage:
            (initialValues?.coverImage as string) || (undefined as undefined | string | File),
        verticalImage:
            (initialValues?.verticalImage as string) || (undefined as undefined | string | File),
        horizontalImage:
            (initialValues?.horizontalImage as string) || (undefined as undefined | string | File),
        detailPageImages:
            (initialValues?.detailPageImages as { value: string; id: number }[]) ||
            ([] as { value: string; id: number }[] | { value: File; id: number }[]),
        categories: initialValues?.categories || ([] as string[]),
        systemRequirementsMinimal: initialValues?.systemRequirementsMinimal || {
            operatingSystem: '',
            cpu: '',
            gpu: '',
            memory: '',
            freeSpace: '',
            soundHardware: '',
        },
        systemRequirementsRecommended: initialValues?.systemRequirementsRecommended || {
            operatingSystem: '',
            cpu: '',
            gpu: '',
            memory: '',
            freeSpace: '',
            soundHardware: '',
        },
        productType: initialValues?.productType || ('game' as ProductType),
    }

    return (
        <Formik
            enableReinitialize
            validateOnBlur
            initialValues={initialFormValues}
            validationSchema={toFormikValidationSchema(formikAddProductValidationSchema)}
            onSubmit={(values) => {
                for (const keyAny in values) {
                    const key = keyAny as keyof typeof values
                    let value = values[key]
                    if (typeof value === 'string') {
                        value = value.trim()
                    }
                }
                submitForm(values)
            }}
        >
            {({ errors, touched, setFieldValue, values }) => {
                // console.log(values, errors)

                const isClientErrors = Object.keys(errors).length !== 0
                const isAnyErrors = serverError || isClientErrors

                const {
                    name,
                    price,
                    quantityInStock,
                    desc,
                    priceWithoutDiscount,
                    ytTrailerPath,
                    ytGameplayTrailerPath,
                    releaseDate,
                    systemRequirementsMinimal,
                    systemRequirementsRecommended,
                } = values

                const mainFields = {
                    name,
                    quantityInStock,
                    price,
                    priceWithoutDiscount,
                    releaseDate,
                    ytTrailerPath,
                    ytGameplayTrailerPath,
                    desc,
                }
                const categoriesNames = categoriesData?.map((category) => category.name)
                const checkboxFiltersData = filtersData?.filter(({ options }) => {
                    return options.length > 0
                })

                return (
                    <Form
                        onChange={() => {
                            if (!!serverSuccess && !!resetServerSuccess) resetServerSuccess()
                        }}
                        className={s.wrap}
                    >
                        <div className={s.form}>
                            <Divider />
                            <h2>Main data</h2>
                            <MainInputs mainFields={mainFields} errors={errors} touched={touched} />
                            <DynamicInput
                                title='Extra descriptions with title (will be displayed after description)'
                                key='characteristics'
                                name='characteristics'
                                fields={values.characteristics}
                                newFieldKeys={['name', 'value']}
                                errors={errors.characteristics}
                                touched={touched.characteristics}
                            />
                            <Divider />
                            <h2>System requirements (minimal)</h2>
                            <SystemRequirementsInputs
                                name='systemRequirementsMinimal'
                                fields={systemRequirementsMinimal}
                                errors={errors.systemRequirementsMinimal}
                                touched={touched.systemRequirementsMinimal}
                            />
                            <h2>System requirements (recommended)</h2>
                            <SystemRequirementsInputs
                                name='systemRequirementsRecommended'
                                fields={systemRequirementsRecommended}
                                errors={errors.systemRequirementsRecommended}
                                touched={touched.systemRequirementsRecommended}
                            />
                            <Divider />
                            <h2>Images</h2>
                            <div className={s.imgInputs}>
                                <ImageInput
                                    name='coverImage'
                                    title='Background image for game page'
                                    value={values.coverImage}
                                    error={errors.coverImage}
                                    onChangeHandler={setFieldValue}
                                />
                                <ImageInput
                                    name='verticalImage'
                                    title='Vertical image for product cards (800px max)'
                                    value={values.verticalImage}
                                    error={errors.verticalImage}
                                    onChangeHandler={setFieldValue}
                                />
                                <ImageInput
                                    name='horizontalImage'
                                    title='Horizontal image for product cards (1200px max)'
                                    value={values.horizontalImage}
                                    error={errors.horizontalImage}
                                    onChangeHandler={setFieldValue}
                                />
                            </div>
                            <Divider />
                            <MultiImageInput
                                setFieldValue={setFieldValue}
                                values={values.detailPageImages}
                                errors={errors.detailPageImages}
                            />
                            <Divider />
                            <h2>Filter data</h2>
                            <h3 style={{ marginBottom: '10px' }}>Product Type</h3>
                            <div style={{ marginBottom: '20px' }}>
                                <Input
                                    name='productType'
                                    type='radio'
                                    radioOptions={['DLC', 'game', 'edition']}
                                    inputTitle={'Product Type'}
                                />
                            </div>
                            <CategoriesInput categoriesNames={categoriesNames} />
                            <FiltersCheckboxes filtersData={checkboxFiltersData} />
                            <h3 className={s.subtitle}>Publisher</h3>
                            <DynamicInput
                                key='publisher'
                                name='filters.publisher'
                                fields={values.filters.publisher}
                                errors={errors.filters?.publisher}
                                touched={touched.filters?.publisher}
                            />
                            <h3 className={s.subtitle}>Developer</h3>
                            <DynamicInput
                                key='developer'
                                name='filters.developer'
                                fields={values.filters.developer}
                                errors={errors.filters?.developer}
                                touched={touched.filters?.developer}
                            />
                            <h3 className={s.subtitle}>Tags</h3>
                            <DynamicInput
                                key='tags'
                                name='filters.tags'
                                fields={values.filters.tags}
                                errors={errors.filters?.tags}
                                touched={touched.filters?.tags}
                            />
                            <Divider />
                            <h2>Original game</h2>
                            <OriginalGameInput
                                name='originalGameId'
                                value={values.originalGameId}
                                setFieldValue={setFieldValue}
                            />
                        </div>
                        <div className={s.footer}>
                            {serverError ? (
                                <div className={s.error}>ERROR! {serverError}</div>
                            ) : null}
                            {serverSuccess ? <div>{serverSuccess}</div> : null}
                            <SubmitButton
                                isError={isAnyErrors ? true : false}
                                isClientError={isClientErrors}
                                isSubmitting={isSubmitting}
                            >
                                {isEditForm ? 'Save' : 'Add product'}
                            </SubmitButton>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}
