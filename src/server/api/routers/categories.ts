import { adminProcedure, createTRPCRouter, publicProcedure } from '../trpc'
import { getAllCategories, getCategoryFilters } from '../trpcFunctions/categoriesQueries'
import { initializeCategories } from '../trpcFunctions/categoriesMutations'
import { resetDB } from '../trpcFunctions/resetDB'

export const categoiesRouter = createTRPCRouter({
    // get
    getAllCategories: publicProcedure.query(async () => {
        return await getAllCategories()
    }),
    getAllCategoryFilters: publicProcedure.query(async () => {
        return await getCategoryFilters()
    }),
    // put
    //delete
    // init
    initialize: adminProcedure.mutation(async () => {
        return await initializeCategories()
    }),
    resetDB: adminProcedure.mutation(async () => {
        return await resetDB()
    }),
})
