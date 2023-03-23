import { createTRPCRouter } from '../trpc'
import { getAllCategories, getCategoryFilters } from '../trpcProcedures/categoriesQueries'
import { initializeCategories } from '../trpcProcedures/categoriesMutations'
import { resetDB } from '../trpcProcedures/resetDB'

export const categoiesRouter = createTRPCRouter({
    // get
    getAllCategories,
    getAllCategoryFilters: getCategoryFilters,
    // init
    initialize: initializeCategories,
    //delete
    resetDB,
})
