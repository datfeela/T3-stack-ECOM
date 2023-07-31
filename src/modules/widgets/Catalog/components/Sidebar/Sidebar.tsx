import type { GetManyProductsSortFilters } from '~/modules/shared/types/productTypes'
import { FiltersForm } from './components/FiltersForm/FiltersForm'
import type { FormikFormData } from '../../types'
import { useInitialFormData } from './hooks/useInitialFormData'
import { mapFiltersDataToApi } from '../../mappers/mapFiltersDataToApi'
import { useRouter } from 'next/router'

interface SidebarProps {
    advancedFilters: GetManyProductsSortFilters
    handleFiltersChange: (filters: GetManyProductsSortFilters) => void
    searchQuery: string
    setSearchQuery: (searchQuery: string) => void
    areProductsLoading: boolean
    isFiltersVisible: boolean
    toggleFiltersDisplay: () => void
}

export const Sidebar = ({
    advancedFilters,
    handleFiltersChange,
    searchQuery,
    setSearchQuery,
    areProductsLoading,
    isFiltersVisible,
    toggleFiltersDisplay,
}: SidebarProps) => {
    const router = useRouter()
    const initialFormValues = useInitialFormData(advancedFilters)

    const handleChange = (values: FormikFormData) => {
        const filtersMapped = mapFiltersDataToApi(values)
        handleFiltersChange(filtersMapped)
    }

    const resetForm = () => {
        setSearchQuery('')
        handleFiltersChange({})
        router.replace('/catalog', undefined, { shallow: true })
    }

    return (
        <FiltersForm
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            initialValues={initialFormValues}
            handleChange={handleChange}
            areProductsLoading={areProductsLoading}
            resetForm={resetForm}
            isVisible={isFiltersVisible}
            changeIsVisible={toggleFiltersDisplay}
        />
    )
}
