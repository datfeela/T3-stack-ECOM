import s from './FiltersForm.module.scss'
import type { mapFiltersDataToFormik } from '~/modules/widgets/Catalog/mappers/mapFiltersDataToFormik'
import { Search } from '~/modules/shared/components/Search/Search'
import { Formik, Form } from 'formik'
import { Input } from '~/modules/shared/components/Inputs/Input'
import { ExpandBlock } from '../ExpandBlock/ExpandBlock'
import { FilterWithExpand } from '../FilterWithExpand/FilterWithExpand'
import type { FormikFormData } from '~/modules/widgets/Catalog/types'
import { CircleLoader } from '~/modules/shared/components/Loaders/Loaders'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'

interface FiltersFormProps {
    searchQuery: string
    setSearchQuery: (query: string) => void
    initialValues: ReturnType<typeof mapFiltersDataToFormik>
    handleChange: (values: FormikFormData) => void
    areProductsLoading: boolean
    resetForm: () => void
    isVisible: boolean
    setIsVisible: (isVisible: boolean) => void
}

export const FiltersForm = ({
    initialValues,
    searchQuery,
    setSearchQuery,
    handleChange,
    areProductsLoading,
    resetForm,
    isVisible,
    setIsVisible,
}: FiltersFormProps) => {
    return (
        <div className={`${s.wrap} ${isVisible ? s.wrap_visible : ''}`}>
            <div className={s.searchWrap}>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    onSubmit={(values) => {
                        handleChange(values)
                        setIsVisible(false)
                    }}
                >
                    {({ values }) => {
                        const {
                            priceMin,
                            priceMax,
                            isWithDiscount,
                            releaseDateStart,
                            releaseDateEnd,
                            productType,
                            categories,
                            filters,
                        } = values

                        return (
                            <Form className={s.formWrap}>
                                <div className={s.filtersWrap}>
                                    <div className={s.filtersHeader}>
                                        <button
                                            type='button'
                                            className={s.hideBtn}
                                            onClick={() => {
                                                setIsVisible(false)
                                            }}
                                        >
                                            <SvgSelector id='arrowDefault' />
                                        </button>
                                        <button
                                            type='button'
                                            className={s.resetBtn}
                                            onClick={() => {
                                                resetForm()
                                            }}
                                        >
                                            clear all
                                        </button>
                                    </div>

                                    <ExpandBlock title='name' isActive={!!searchQuery}>
                                        <Search
                                            handleChange={setSearchQuery}
                                            value={searchQuery}
                                            inputName='catalogSearch'
                                            view='catalog'
                                        />
                                    </ExpandBlock>
                                    {/* main inputs */}
                                    <ExpandBlock
                                        title='price'
                                        isActive={!!priceMin || !!priceMax || !!isWithDiscount}
                                    >
                                        <div className={s.doubleInputRow}>
                                            <div className={s.inputWithSubtitle}>
                                                <span>From:</span>
                                                <Input
                                                    name='priceMin'
                                                    size='xs'
                                                    color='purple'
                                                    withBg={false}
                                                    placeholder='0'
                                                    withMargin={false}
                                                    type='number'
                                                />
                                            </div>
                                            <div className={s.inputWithSubtitle}>
                                                <span>To:</span>
                                                <Input
                                                    name='priceMax'
                                                    size='xs'
                                                    color='purple'
                                                    withBg={false}
                                                    withMargin={false}
                                                    placeholder='10000'
                                                    type='number'
                                                />
                                            </div>
                                        </div>
                                        <div className={s.checkboxWithMargin}>
                                            <Input
                                                name='isWithDiscount'
                                                type='checkbox'
                                                inputTitle='With discount'
                                            />
                                        </div>
                                    </ExpandBlock>
                                    <ExpandBlock
                                        title='Release Year'
                                        isActive={!!releaseDateStart || !!releaseDateEnd}
                                    >
                                        <div className={s.doubleInputRow}>
                                            <div className={s.inputWithSubtitle}>
                                                <span>From:</span>
                                                <Input
                                                    name='releaseDateStart'
                                                    size='xs'
                                                    color='purple'
                                                    withBg={false}
                                                    placeholder='1990'
                                                    withMargin={false}
                                                    type='number'
                                                />
                                            </div>
                                            <div className={s.inputWithSubtitle}>
                                                <span>To:</span>
                                                <Input
                                                    name='releaseDateEnd'
                                                    size='xs'
                                                    color='purple'
                                                    withBg={false}
                                                    withMargin={false}
                                                    placeholder={`${new Date().getFullYear()}`}
                                                    type='number'
                                                />
                                            </div>
                                        </div>
                                    </ExpandBlock>

                                    <ExpandBlock
                                        title='product type'
                                        isActive={
                                            !!Object.values(productType).find((el) => el === true)
                                        }
                                    >
                                        <FilterWithExpand name='productType' values={productType} />
                                    </ExpandBlock>

                                    {/* main inputs end*/}

                                    <ExpandBlock
                                        title='genre'
                                        isActive={
                                            !!Object.values(categories).find((el) => el === true)
                                        }
                                    >
                                        <FilterWithExpand name='categories' values={categories} />
                                    </ExpandBlock>

                                    {/* filters */}
                                    {Object.entries(filters).map(([name, values]) => {
                                        let title = name

                                        if (name === 'gamemodes') title = 'mode'
                                        if (name === 'platforms') title = 'platform'

                                        return (
                                            <ExpandBlock
                                                key={name}
                                                title={title}
                                                isActive={
                                                    !!Object.values(values).find(
                                                        (el) => el === true,
                                                    )
                                                }
                                            >
                                                <FilterWithExpand
                                                    name={`filters[${name}]`}
                                                    values={values}
                                                    isWithSearch={true}
                                                />
                                            </ExpandBlock>
                                        )
                                    })}
                                    {/* filters end */}
                                </div>
                                <button
                                    disabled={areProductsLoading}
                                    type='submit'
                                    className={s.submitBtn}
                                >
                                    <span>Apply filters</span>
                                    {areProductsLoading ? <CircleLoader /> : null}
                                </button>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    )
}
