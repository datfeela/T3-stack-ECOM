import { api } from '~/modules/shared/api/apiTRPC'
import type { ProductWithQuantity } from '../types/types'

export const useProductsData = (products: { [productId: string]: number }) => {
    const productsIds = Object.keys(products)

    const productsData = api.products.getManyProductsByIds
        .useQuery(productsIds, {
            keepPreviousData: true,
        })
        .data?.map((el) => ({ ...el, quantityInCart: products[el.id] })) as
        | ProductWithQuantity[]
        | undefined

    return productsData
}
