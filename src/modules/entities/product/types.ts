import type {
    ProductCategory,
    ProductCharacteristic,
    ProductFilter,
    ProductFilterValue,
    ProductImagePath,
    ProductSystemRequirements,
    Product as ProductT,
    User,
} from '@prisma/client'

export interface ProductPageProps extends ProductT {
    categories: ProductCategory[]
    characteristics: ProductCharacteristic[]
    detailPageImages: ProductImagePath[]
    filters: (ProductFilter & {
        values: ProductFilterValue[]
    })[]
    wishedBy: User[]
    systemRequirementsMinimal: ProductSystemRequirements
    systemRequirementsRecommended: ProductSystemRequirements
    relatedGames:
        | {
              id: string
          }[]
        | undefined
}

export interface ProductPagePropsSerialized extends Omit<ProductPageProps, 'releaseDate'> {
    releaseDate: string
}
