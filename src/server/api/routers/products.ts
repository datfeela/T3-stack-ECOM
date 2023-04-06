import { getProductReviewsById } from './../trpcProcedures/productsQueries'
import { createTRPCRouter } from '../trpc'

import { getManyProducts, getProductById } from '../trpcProcedures/productsQueries'
import {
    addProduct,
    deleteAllProducts,
    editProduct,
    toggleProductToWishes,
    addReviewToProduct,
} from '../trpcProcedures/productsMutations'

export const productsRouter = createTRPCRouter({
    // get
    getProductById,
    getManyProducts,
    getProductReviewsById,
    // create
    addProduct,
    // update
    editProduct,
    toggleProductToWishes,
    addReviewToProduct,
    // delete
    deleteAllProducts,
})
