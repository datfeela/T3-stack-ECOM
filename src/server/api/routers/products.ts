import { createTRPCRouter } from '../trpc'

import {
    getProductById,
    getProductMainDataByIdProcedure as getProductMainDataById,
    getManyProducts,
    getRecommendedProductsForProduct,
    getProductReviewsById,
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
    getProductMainDataById,
    getManyProducts,
    getRecommendedProductsForProduct,
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
