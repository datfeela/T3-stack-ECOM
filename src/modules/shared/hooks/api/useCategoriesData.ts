import { api } from '../../api/apiTRPC'

interface UseCategoriesDataProps {
    keepPreviousData?: boolean
    refetchOnWindowFocus?: boolean
}

export const useCategoriesData = ({
    keepPreviousData = false,
    refetchOnWindowFocus = true,
}: UseCategoriesDataProps) => {
    return api.categories.getAllCategories.useQuery(undefined, {
        keepPreviousData,
        refetchOnWindowFocus,
    }).data
}
