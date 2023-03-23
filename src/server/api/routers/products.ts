import { createTRPCRouter } from '../trpc'

import { getManyProducts, getProductById } from '../trpcProcedures/productsQueries'
import {
    addProduct,
    deleteAllProducts,
    editProduct,
    toggleProductToWishes,
} from '../trpcProcedures/productsMutations'

export const productsRouter = createTRPCRouter({
    // get
    getProductById,
    getManyProducts,
    // create
    addProduct,
    // update
    editProduct,
    toggleProductToWishes,
    // delete
    deleteAllProducts,
})
