import { api } from '~/modules/shared/api/apiTRPC'
import { mapProductDataFromApi } from '../mappers/mapProductDataFromApi'

export const useEditFormInitialValues = (productId: string) => {
    // get product
    const product = api.products.getProductById.useQuery(productId, {
        refetchOnWindowFocus: false,
    })

    // reformat data into formik initial values
    const initialValues = product.data ? mapProductDataFromApi(product.data) : undefined

    return { initialValues, isLoaded: !!product.data }
}
