import type { GetManyProductsSortFilters } from '~/modules/shared/types/productTypes'
import { useCategoriesData } from '~/modules/shared/hooks/api/useCategoriesData'
import { useFiltersData } from '~/modules/shared/hooks/api/useFiltersData'
import { mapFiltersDataToFormik } from '../../../mappers/mapFiltersDataToFormik'

export const useInitialFormData = (filters: GetManyProductsSortFilters) => {
    const allFilters = useFiltersData({ refetchOnWindowFocus: false })
    const allCategories = useCategoriesData({ refetchOnWindowFocus: false })
    const initialFormValues = mapFiltersDataToFormik({
        allFilters,
        allCategories,
        advancedFilters: filters,
    })

    return initialFormValues
}
