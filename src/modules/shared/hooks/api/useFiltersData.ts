import type { FilterResponse } from '~/server/api/apiTypes/productsRouterTypes'
import { api } from '../../api/apiTRPC'

interface UseFiltersDataProps {
    keepPreviousData?: boolean
    refetchOnWindowFocus?: boolean
}

export const useFiltersData = ({
    keepPreviousData = false,
    refetchOnWindowFocus = true,
}: UseFiltersDataProps) => {
    return api.categories.getAllCategoryFilters.useQuery(undefined, {
        keepPreviousData,
        refetchOnWindowFocus,
    }).data as FilterResponse[] | undefined
}
