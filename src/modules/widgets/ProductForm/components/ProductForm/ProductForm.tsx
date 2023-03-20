import { Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { formikAddProductValidationSchema } from '~/modules/shared/lib/validationSchemas'

import { api } from '~/modules/shared/api/apiTRPC'
import type { FilterName, FilterResponse } from '~/server/api/apiTypes/productsRouterTypes'
import type { ProductFormProps } from '../../ProductFormTypes'

import { DynamicInput } from '~/modules/shared/components/Inputs/DynamicInput'

import { ImageInput } from '../ImageInput/ImageInput'
import { MainInputs } from '../MainInputs/MainInputs'
import { CategoriesInput } from '../CategoriesInput/CategoriesInput'
import { FiltersCheckboxes } from '../FiltersCheckboxes/FiltersCheckboxes'

//! todo: set is uploading?
// if editing existing - add product id in props
// add custom hook that gets product data via id, if hook returns data - replace initial values
// formsubmit should also go through props
export const ProductForm = ({
    initialValues,
    serverError,
    submitForm,
    isEditForm,
}: ProductFormProps) => {
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
        releaseDate: initialValues?.releaseDate || '2018-07-22',
        desc: initialValues?.desc || '',
        ytTrailerPath: initialValues?.ytTrailerPath || '',
        characteristics:
            initialValues?.characteristics || ([] as { name: string; value: string }[]),
        filters: {
            gamemodes: initialValues?.filters?.gamemodes || [],
            platforms: initialValues?.filters?.platforms || [],
            features: initialValues?.filters?.features || [],
            tags: initialValues?.filters?.tags || ([] as string[]),
            publisher: initialValues?.filters?.publisher || ([] as string[]),
        } as {
            [key in FilterName]: string[]
        },
        coverImage:
            (initialValues?.coverImage as string) || (undefined as undefined | string | File),
        verticalOrientImage:
            (initialValues?.verticalOrientImage as string) ||
            (undefined as undefined | string | File),
        miniatureImage:
            (initialValues?.miniatureImage as string) || (undefined as undefined | string | File),
        categories: initialValues?.categories || ([] as string[]),
    }

    // submit

    return (
        <Formik
            enableReinitialize
            initialValues={initialFormValues}
            validationSchema={toFormikValidationSchema(formikAddProductValidationSchema)}
            onSubmit={(values, { setFieldError }) => {
                for (const keyAny in values) {
                    const key = keyAny as keyof typeof values
                    let value = values[key]
                    if (typeof value === 'string') {
                        value = value.trim()
                    }
                    // todo: replace w/ validation schema on
                    if (
                        key === 'price' ||
                        (key === 'priceWithoutDiscount' &&
                            typeof value === 'string' &&
                            value?.length !== 0)
                    ) {
                        if (Number.isNaN(Number(value as string))) {
                            setFieldError(key, 'price should be numbers only')
                            return
                        }
                        if (Number(value as string) <= 0) {
                            setFieldError(key, `price can't be less, than 0`)
                            return
                        }
                    }
                }

                submitForm(values)
            }}
        >
            {({ errors, touched, initialValues, setFieldValue, values }) => {
                // console.log(errors)

                const { name, price, desc, priceWithoutDiscount, ytTrailerPath, releaseDate } =
                    values

                const mainFields = {
                    name,
                    price,
                    priceWithoutDiscount,
                    desc,
                    ytTrailerPath,
                    releaseDate,
                }
                const categoriesNames = categoriesData?.map((category) => category.name)
                const checkboxFiltersData = filtersData?.filter(({ options }) => {
                    return options.length > 0
                })

                return (
                    <Form>
                        <div>
                            <h2>Main data</h2>
                            <MainInputs mainFields={mainFields} errors={errors} touched={touched} />
                            <div style={{ display: 'flex', gap: '30px' }}>
                                <ImageInput
                                    name='coverImage'
                                    title='Cover image'
                                    value={values.coverImage}
                                    error={errors.coverImage}
                                    onChangeHandler={setFieldValue}
                                />
                                <ImageInput
                                    name='verticalOrientImage'
                                    title='Vertical oriented image'
                                    value={values.verticalOrientImage}
                                    error={errors.verticalOrientImage}
                                    onChangeHandler={setFieldValue}
                                />
                                <ImageInput
                                    name='miniatureImage'
                                    title='miniature'
                                    value={values.miniatureImage}
                                    error={errors.miniatureImage}
                                    onChangeHandler={setFieldValue}
                                />
                            </div>
                            <h2>Filter data</h2>
                            <DynamicInput
                                title='publisher'
                                key='publisher'
                                name='filters.publisher'
                                fields={values.filters.publisher}
                                errors={errors.filters?.publisher}
                                touched={touched.filters?.publisher}
                            />
                            <CategoriesInput categoriesNames={categoriesNames} />
                            <FiltersCheckboxes filtersData={checkboxFiltersData} />
                            <DynamicInput
                                title='characteristics'
                                key='characteristics'
                                name='characteristics'
                                fields={values.characteristics}
                                newFieldKeys={['name', 'value']}
                                errors={errors.characteristics}
                                touched={touched.characteristics}
                            />
                            <DynamicInput
                                title='tags'
                                key='tags'
                                name='filters.tags'
                                fields={values.filters.tags}
                                errors={errors.filters?.tags}
                                touched={touched.filters?.tags}
                            />
                        </div>
                        {serverError ? <div>ERROR! {serverError}</div> : null}
                        <button
                            style={{ border: '1px solid #fff', padding: '10px', marginTop: '20px' }}
                            type='submit'
                        >
                            {isEditForm ? 'Save' : 'Add product'}
                        </button>
                    </Form>
                )
            }}
        </Formik>
    )
}
