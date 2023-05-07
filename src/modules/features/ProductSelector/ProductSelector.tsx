import s from './ProductSelector.module.scss'
import { useState } from 'react'
import { useDebouncedValue } from '~/modules/shared/hooks/useDebouncedValue'
import { Search } from '~/modules/shared/components/Search/Search'
import { LoaderFullScreen } from '~/modules/shared/components/Loaders/Loaders'
import { AdminProductCard } from '~/modules/shared/components/AdminProductCard/AdminProductCard'
import { useManyProductsData } from '~/modules/shared/hooks/api/useManyProductsData'

export interface ProductSelectorProps {
    selectedIds: string[]
    handleChange: (value: string) => void
}

export const ProductSelector = ({ selectedIds, handleChange }: ProductSelectorProps) => {
    const [searchQuery, setSearchQuery] = useState('')

    const handleProductSelect = (id: string) => {
        handleChange(id)
    }

    const { value: debouncedSearchQuery, isDebouncing } = useDebouncedValue<string>(
        searchQuery,
        250,
    )

    const { data, isLoading } = useManyProductsData({
        searchQuery: debouncedSearchQuery,
        quantity: 10,
    })

    const products = data?.map(({ id, name, price, horizontalImagePath }) => (
        <AdminProductCard
            key={id}
            id={id}
            name={name}
            price={price}
            imgSrc={horizontalImagePath}
            isWithSelect={true}
            isSelected={!!selectedIds.find((el) => el === id)}
            handleClick={handleProductSelect}
        />
    ))

    const areProductsFound = products && products.length > 0 ? true : false
    const isNothingFound =
        searchQuery && !isLoading && (!products || products?.length <= 0) ? true : false

    return (
        <div className={s.wrap}>
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
