import s from './ProductSelector.module.scss'
import { useState } from 'react'
import { api } from '~/modules/shared/api/apiTRPC'
import { useDebouncedValue } from '~/modules/shared/hooks/useDebouncedValue'
import { Search } from '~/modules/shared/components/Search/Search'
import { ProductCard } from './components/ProductCard/ProductCard'
import { LoaderFullScreen } from '~/modules/shared/components/Loaders/Loaders'

export interface ProductSelectorProps {
    selectedId: string
    handleChange: (value: string) => void
}

export const ProductSelector = ({ selectedId, handleChange }: ProductSelectorProps) => {
    const [searchQuery, setSearchQuery] = useState('')

    const handleProductSelect = (id: string) => {
        if (id === selectedId) handleChange('')
        else handleChange(id)
    }

    const { value: debouncedSearchQuery, isDebouncing } = useDebouncedValue<string>(
        searchQuery,
        250,
    )

    const { data, isLoading } = api.products.getManyProducts.useQuery({
        quantity: 10,
        searchQuery: debouncedSearchQuery,
    })

    const products = data?.map(({ id, name, price, horizontalImagePath }) => (
        <ProductCard
            key={id}
            id={id}
            selectedProductId={selectedId}
            name={name}
            price={price}
            imgSrc={horizontalImagePath}
            handleClick={handleProductSelect}
        />
    ))

    const selectedProduct = api.products.getProductById.useQuery(selectedId).data

    const areProductsFound = products && products.length > 0 ? true : false
    const isNothingFound =
        searchQuery && !isLoading && (!products || products?.length <= 0) ? true : false

    return (
        <div className={s.wrap}>
            {selectedProduct ? (
                <div className={s.selectedProduct}>
                    <span>Selected product: </span>
                    <ProductCard
                        imgSrc={selectedProduct.horizontalImagePath}
                        name={selectedProduct.name}
                        price={selectedProduct.price}
                        key={selectedProduct.id}
                    />
                </div>
            ) : null}
            <span>
                If this product is anothers game DLC / Edition, you can select original game below
            </span>
            <Search
                inputName='products-search'
                value={searchQuery}
                handleChange={setSearchQuery}
                isLoading={isDebouncing || isLoading}
            />

            <div className={`${s.productsWrap}`}>
                {areProductsFound ? <> {products} </> : null}
                {isLoading ? <LoaderFullScreen type='dots' /> : null}
                {isNothingFound ? <div>Nothing was found.</div> : null}
            </div>
        </div>
    )
}
