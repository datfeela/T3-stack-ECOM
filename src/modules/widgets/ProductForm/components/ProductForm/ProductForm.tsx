import s from './ProductForm.module.scss'
import { Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'

import { api } from '~/modules/shared/api/apiTRPC'
import type { FilterResponse } from '~/server/api/apiTypes/productsRouterTypes'
import type { ProductFormProps, ProductType } from '../../ProductFormTypes'

import { DynamicInput } from '~/modules/shared/components/Inputs/DynamicInput'

import ImageInput from '../ImageInput/ImageInput'
import { MainInputs } from '../MainInputs/MainInputs'
import { CategoriesInput } from '../CategoriesInput/CategoriesInput'
import { FiltersCheckboxes } from '../FiltersCheckboxes/FiltersCheckboxes'
import SubmitButton from '../SubmitButton/SubmitButton'
import { formikAddProductValidationSchema } from '../../lib/validationSchemas'
import { OriginalGameInput } from '../OriginalGameInput/OriginalGameInput'
import { SystemRequirementsInputs } from '../SystemRequirementsInputs/SystemRequirementsInputs'
import type { FilterName } from '~/modules/shared/types/productTypes'
import { Input } from '~/modules/shared/components/Inputs/Input'

// if editing existing - add product id in props
// add custom hook that gets product data via id, if hook returns data - replace initial values
// formsubmit should also go through props
export const ProductForm = ({
    initialValues,
    serverError,
    submitForm,
    isEditForm,
    isSubmitting,
}: ProductFormProps) => {
    // console.log(initialValues)

    // data for categories chekbox inputs initialize
    const categoriesData = api.categories.getAllCategories.useQuery(undefined, {
        refetchOnWindowFocus: false,
    }).data

    // data for filters chekbox inputs initialize
    const filtersData = api.categories.getAllCategoryFilters.useQuery(undefined, {
        refetchOnWindowFocus: false,
    }).data as FilterResponse[] | undefined

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
            (initialValues?.detailPageImages as string[]) || ([] as string[] | File[]),
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

    // submit

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
                    // todo: replace w/ validation schema on
                }
                submitForm(values)
            }}
        >
            {({ errors, touched, setFieldValue, values }) => {
                // console.log(values, errors)

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

                const isAnyErrors = serverError || Object.keys(errors).length !== 0

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

                const detailPageImagesElements = [] as JSX.Element[]

                for (let i = 0; i < 6; i++) {
                    detailPageImagesElements.push(
                        <ImageInput
                            key={`detailImgInput${i}`}
                            name={`detailPageImages[${i}]`}
                            title={`image ${i + 1}`}
                            value={values.detailPageImages[i]}
                            error={errors.detailPageImages && errors.detailPageImages[i]}
                            onChangeHandler={setFieldValue}
                        />,
                    )
                }

                return (
                    <Form>
                        <div>
                            <h2>Main data</h2>
                            <MainInputs mainFields={mainFields} errors={errors} touched={touched} />
                            <DynamicInput
                                title='features (will be displayed after product description)'
                                key='characteristics'
                                name='characteristics'
                                fields={values.characteristics}
                                newFieldKeys={['name', 'value']}
                                errors={errors.characteristics}
                                touched={touched.characteristics}
                            />
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
                            <h2>Images</h2>
                            <div className={s.imgInputs}>
                                <ImageInput
                                    name='coverImage'
                                    title='background image for game page'
                                    value={values.coverImage}
                                    error={errors.coverImage}
                                    onChangeHandler={setFieldValue}
                                />
                                <ImageInput
                                    name='verticalImage'
                                    title='Vertical oriented image'
                                    value={values.verticalImage}
                                    error={errors.verticalImage}
                                    onChangeHandler={setFieldValue}
                                />
                                <ImageInput
                                    name='horizontalImage'
                                    title='horizontal oriented image'
                                    value={values.horizontalImage}
                                    error={errors.horizontalImage}
                                    onChangeHandler={setFieldValue}
                                />
                            </div>
                            <h2>Detailed page images</h2>
                            <div className={s.imgInputs}>{detailPageImagesElements}</div>
                            <h2>Filter data</h2>
                            <DynamicInput
                                title='publisher'
                                key='publisher'
                                name='filters.publisher'
                                fields={values.filters.publisher}
                                errors={errors.filters?.publisher}
                                touched={touched.filters?.publisher}
                            />
                            <DynamicInput
                                title='developer'
                                key='developer'
                                name='filters.developer'
                                fields={values.filters.developer}
                                errors={errors.filters?.developer}
                                touched={touched.filters?.developer}
                            />
                            <CategoriesInput categoriesNames={categoriesNames} />
                            <FiltersCheckboxes filtersData={checkboxFiltersData} />
                            <DynamicInput
                                title='tags'
                                key='tags'
                                name='filters.tags'
                                fields={values.filters.tags}
                                errors={errors.filters?.tags}
                                touched={touched.filters?.tags}
                            />
                            <h2 style={{ marginBottom: '10px' }}>Product Type</h2>
                            <div style={{ marginBottom: '15px' }}>
                                <Input
                                    name='productType'
                                    type='radio'
                                    radioOptions={['DLC', 'game', 'edition']}
                                    title={'Product Type'}
                                />
                            </div>
                            <h2>Original game</h2>
                            <OriginalGameInput
                                name='originalGameId'
                                value={values.originalGameId}
                                setFieldValue={setFieldValue}
                            />
                        </div>
                        {serverError ? <div>ERROR! {serverError}</div> : null}
                        <SubmitButton
                            isError={isAnyErrors ? true : false}
                            isSubmitting={isSubmitting}
                        >
                            {isEditForm ? 'Save' : 'Add product'}
                        </SubmitButton>
                    </Form>
                )
            }}
        </Formik>
    )
}
