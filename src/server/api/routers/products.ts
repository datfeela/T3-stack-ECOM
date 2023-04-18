import { getProductReviewsById } from './../trpcProcedures/productsQueries'
import { createTRPCRouter } from '../trpc'

import {
    getManyProducts,
    getProductById,
    getProductReviewsStats,
} from '../trpcProcedures/productsQueries'
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
    getProductReviewsStats,
    // create
    addProduct,
    // update
    editProduct,
    toggleProductToWishes,
    addReviewToProduct,
    // delete
    deleteAllProducts,
})
