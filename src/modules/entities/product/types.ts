import type {
    MainPageProduct,
    Product,
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

export type ProductPagePropsSerialized = ProductSerialized<ProductPageProps>

export type ProductSerialized<T> = Omit<T, 'releaseDate'> & {
    releaseDate: string
}

// main page product

export type MainPageProductBase = Product & {
    detailPageImages: ProductImagePath[]
}

export type MainPageProductFromApi = MainPageProduct & { product: MainPageProductBase }

export type MainPageProductFromApiSerialized = MainPageProduct & {
    product: ProductSerialized<MainPageProductBase>
}

// popular products

export type ProductFromApiDefault = Product & {
    categories: ProductCategory[]
}

export type ProductFromApiDefaultSerialized = ProductSerialized<ProductFromApiDefault>
