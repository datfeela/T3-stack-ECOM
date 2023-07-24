import type { ProductCategory } from '@prisma/client'
import type { GetManyProductsSortFilters } from '~/modules/shared/types/productTypes'
import type { FilterResponse } from '~/server/api/apiTypes/productsRouterTypes'
import type { FiltersMappedToFormik } from '../types'

interface MapFiltersDataToFormikProps {
    advancedFilters: GetManyProductsSortFilters
    allFilters: FilterResponse[] | undefined
    allCategories: ProductCategory[] | undefined
}

export const mapFiltersDataToFormik = ({
    advancedFilters,
    allCategories,
    allFilters,
}: MapFiltersDataToFormikProps) => {
    const {
        productType,
        isWithDiscount,
        priceMin,
        priceMax,
        releaseDateStart,
        releaseDateEnd,
        categories,
        filters: selectedFilters,
    } = advancedFilters

    return {
        productType: {
            game: !!productType?.find((value) => value === 'game'),
            DLC: !!productType?.find((value) => value === 'DLC'),
            edition: !!productType?.find((value) => value === 'edition'),
        },
        isWithDiscount,
        priceMin: priceMin || '',
        priceMax: priceMax || '',
        releaseDateStart: releaseDateStart ? String(releaseDateStart?.getFullYear()) : '',
        releaseDateEnd: releaseDateEnd ? String(releaseDateEnd?.getFullYear()) : '',
        categories: allCategories
            ? allCategories.reduce((acc, { name }) => {
                  return { ...acc, [name]: !!categories?.find((value) => value === name) }
              }, {})
            : {},
        filters: allFilters
            ? (allFilters.reduce((acc, { name, options }) => {
                  const selectedOptions = selectedFilters?.find(
                      (filter) => filter.name === name,
                  )?.values

                  return {
                      ...acc,
                      [name]: options.reduce((acc, current) => {
                          return {
                              ...acc,
                              [current.name]: selectedOptions?.find(
                                  (value) => current.name === value,
                              )
                                  ? true
                                  : false,
                          }
                      }, {}),
                  }
              }, {}) as FiltersMappedToFormik)
            : ({} as FiltersMappedToFormik),
    }
}
