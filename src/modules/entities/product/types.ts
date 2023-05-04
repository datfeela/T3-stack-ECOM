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

export interface ProductPagePropsSerialized extends Omit<ProductPageProps, 'releaseDate'> {
    releaseDate: string
}

// main page product

export type MainPageProductFromApi = MainPageProduct & {
    product: Product & {
        detailPageImages: ProductImagePath[]
    }
}

export type MainPageProductFromApiSerialized = MainPageProduct & {
    product: Omit<Product, 'releaseDate'> & {
        detailPageImages: ProductImagePath[]
        releaseDate: string
    }
}

export type MainPageSliderProps = MainPageProductFromApi[]

export type MainPageSliderPropsSerialized = MainPageProductFromApiSerialized[]

// popular products

export type PopularProductFromApi = Product & {
    categories: ProductCategory[]
}

export type PopularProductFromApiSerialized = Omit<Product, 'releaseDate'> & {
    categories: ProductCategory[]
    releaseDate: string
}

export type PopularProductsData = PopularProductFromApi[]

export type PopularProductsDataSerialized = PopularProductFromApiSerialized[]
