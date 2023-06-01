import { WithLoader } from '~/modules/shared/components/WrapWithLoader/WrapWithLoader'
import s from './SelectedProducts.module.scss'
import { AdminProductCard } from '~/modules/shared/components/AdminProductCard/AdminProductCard'
import type { SelectedProduct } from '../../types/types'
import type { ChangeEvent } from 'react'

interface SelectedProductsProps {
    selectedProducts: SelectedProduct[] | undefined
    changeProductSort: (e: ChangeEvent<HTMLInputElement>, id: string) => void
    handleSelectedGamesChange: (value: string) => void
}

export const SelectedProducts = ({
    selectedProducts,
    handleSelectedGamesChange,
    changeProductSort,
}: SelectedProductsProps) => {
    return (
        <WithLoader loaderType='dots' conditionToShowLoader={!selectedProducts}>
            {selectedProducts ? (
                <>
                    {selectedProducts.length > 0 ? (
                        <>
                            <h3>Selected products</h3>
                            <div className={s.selectedProductsHeader}>
                                <span>Image</span>
                                <span>Name</span>
                                <span>price</span>
                                <span>sort</span>
                                <span>delete</span>
                            </div>
                            <div className={s.productsWrap}>
                                {selectedProducts.map((selectedProduct) => (
                                    <div key={selectedProduct.id}>
                                        <AdminProductCard
                                            id={selectedProduct.id}
                                            imgSrc={selectedProduct.horizontalImagePath}
                                            name={selectedProduct.name}
                                            price={selectedProduct.price}
                                            key={selectedProduct.id}
                                            withSort={true}
                                            onSortChange={changeProductSort}
                                            sortNum={selectedProduct.sortNum}
                                            onDelete={handleSelectedGamesChange}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : null}
                </>
            ) : null}
        </WithLoader>
    )
}
