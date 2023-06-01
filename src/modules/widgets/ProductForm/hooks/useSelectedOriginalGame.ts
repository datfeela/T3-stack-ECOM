import { api } from '~/modules/shared/api/apiTRPC'

export const useSelectedOriginalGame = (value: string) => {
    const selectedProduct = api.products.getProductById.useQuery(value, {
        keepPreviousData: true,
    }).data

    return selectedProduct
}
