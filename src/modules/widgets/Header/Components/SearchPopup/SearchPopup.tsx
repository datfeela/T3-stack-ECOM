import s from './SearchPopup.module.scss'

import { DotsLoader } from '~/modules/shared/components/Loaders/Loaders'
import { ProductCard } from '~/modules/shared/components/ProductCard'
import { useInfiniteScroll } from '~/modules/shared/hooks/useInfiniteScroll'

import type { ProductType } from '~/modules/shared/types/productTypes'
import type { Product, ProductCategory } from '@prisma/client'

interface SearchPopupProps {
    products:
        | (Product & {
              categories: ProductCategory[]
          })[]
        | undefined
    isLoading: boolean
    isAllProductsLoaded: boolean
    areProductsFound: boolean
    isNothingFound: boolean
    getNextPage: () => void
    quantityLoadingPerPage: number
}

const SearchPopup = ({
    products,
    isLoading,
    isAllProductsLoaded,
    getNextPage,
    areProductsFound,
    isNothingFound,
    quantityLoadingPerPage,
}: SearchPopupProps) => {
    const scrollAnchorRef = useInfiniteScroll({
        getMore: () => {
            getNextPage()
        },
        shouldGetMore: !isLoading && !isAllProductsLoaded,
        observerOptions: {
            root: typeof window === 'object' ? document.querySelector(`${s.popup}`) : undefined,
        },
    })

    const productsEls = products?.map(
        (
            {
                id,
                name,
                price,
                priceWithoutDiscount,
                horizontalImagePath,
                productType,
                releaseDate,
            },
            mapId,
        ) => (
            <div
                className={s.productWrap}
                key={id}
                ref={
                    mapId === products.length - quantityLoadingPerPage ? scrollAnchorRef : undefined
                }
            >
                <ProductCard
                    key={id}
                    view='search'
                    id={id}
                    name={name}
                    price={price}
                    priceWithoutDiscount={priceWithoutDiscount}
                    imgPath={horizontalImagePath}
                    imageSizes='300px'
                    productType={productType as ProductType}
                    linkBasePathName={'/game'}
                    releaseDate={releaseDate}
                />
            </div>
        ),
    )

    return (
        <div className={s.popupContent}>
            {areProductsFound ? <div className={s.products}>{productsEls}</div> : null}
            {isLoading ? (
                <div className={s.loader}>
                    <DotsLoader />
                </div>
            ) : null}
            {isNothingFound ? (
                <div className={s.nothingFound}>
                    Nothing was found, try searching for something else.
                    <br /> Soon there will be personal recommendations...
                </div>
            ) : null}
        </div>
    )
}

export default SearchPopup
