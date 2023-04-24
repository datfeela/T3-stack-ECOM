import { createTRPCRouter } from '../trpc'

import {
    // single product data
    getProductById,
    getProductMainDataByIdProcedure as getProductMainDataById,
    getProductReviewsById,
    getProductReviewsStats,
    // many products
    getManyProducts,
    getManyProductsByIds,
    getRelatedProducts,
    getRecommendedProductsForProduct,
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
    getManyProductsByIds,
    getRelatedProducts,
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
