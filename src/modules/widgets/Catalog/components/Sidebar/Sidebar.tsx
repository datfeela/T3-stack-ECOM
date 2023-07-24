import type { GetManyProductsSortFilters } from '~/modules/shared/types/productTypes'
import { FiltersForm } from './components/FiltersForm/FiltersForm'
import type { FormikFormData } from '../../types'
import { useInitialFormData } from './hooks/useInitialFormData'
import { mapFiltersDataToApi } from '../../mappers/mapFiltersDataToApi'

interface SidebarProps {
    advancedFilters: GetManyProductsSortFilters
    handleFiltersChange: (filters: GetManyProductsSortFilters) => void
    searchQuery: string
    setSearchQuery: (searchQuery: string) => void
    areProductsLoading: boolean
}

export const Sidebar = ({
    advancedFilters,
    handleFiltersChange,
    searchQuery,
    setSearchQuery,
    areProductsLoading,
}: SidebarProps) => {
    const initialFormValues = useInitialFormData(advancedFilters)

    const handleChange = (values: FormikFormData) => {
        const filtersMapped = mapFiltersDataToApi(values)
        handleFiltersChange(filtersMapped)
    }

    const resetForm = () => {
        setSearchQuery('')
        handleFiltersChange({})
    }

    return (
        <FiltersForm
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            initialValues={initialFormValues}
            handleChange={handleChange}
            areProductsLoading={areProductsLoading}
            resetForm={resetForm}
        />
    )
}
