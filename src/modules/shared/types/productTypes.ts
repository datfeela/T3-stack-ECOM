import type { z } from 'zod'
import type { AppRouterOutput } from '~/server/api/root'
import type { clientFiltersSchema, filterNameEnum, productType } from '../lib/validationSchemas'

type ProductFromApiT = AppRouterOutput['products']['getProductById']
const productFromApi = {} as NonNullable<ProductFromApiT>
export type ProductFiltersFromApi = typeof productFromApi.filters

export type ProductFiltersClient = z.infer<typeof clientFiltersSchema>

export type Platform = 'ps' | 'xbox' | 'windows'
export type FilterName = z.infer<typeof filterNameEnum>
export type ProductType = z.infer<typeof productType>
