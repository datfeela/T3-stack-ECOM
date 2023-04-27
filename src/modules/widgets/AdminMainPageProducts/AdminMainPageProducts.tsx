import { ProductSelector } from '~/modules/features/ProductSelector'
import s from './AdminMainPageProducts.module.scss'
import { AdminProductCard } from '~/modules/shared/components/AdminProductCard/AdminProductCard'
import { useSelectedProducts } from './hooks/useSelectedProducts'
import { ButtonDefault } from '~/modules/shared/components/Button/Button'
import { api } from '~/modules/shared/api/apiTRPC'
import { useState } from 'react'
import { WithLoader } from '~/modules/shared/components/WrapWithLoader/WrapWithLoader'
import { CircleLoader } from '~/modules/shared/components/Loaders/Loaders'

export const AdminMainPageProducts = () => {
    const { selectedProducts, handleSelectedGamesChange, changeProductSort } = useSelectedProducts()

    // useUpdateProducts
    const [serverError, setServerError] = useState('')
    const [serverSuccess, setServerSuccess] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const apiContext = api.useContext()

    const updateProducts = api.products.updateMainPageProducts.useMutation({
        onMutate: async () => {
            await apiContext.products.getMainPageProducts.cancel()
            const optimisticUpdate = apiContext.products.getMainPageProducts.getData()

            if (optimisticUpdate) {
                apiContext.products.getMainPageProducts.setData(undefined, optimisticUpdate)
            }
        },
        onSettled: () => {
            setIsSubmitting(false)
        },
        onError: (e) => {
            setServerSuccess('')
            setServerError(e.message)
        },
        onSuccess: async () => {
            await apiContext.products.getMainPageProducts.invalidate()
            setServerSuccess('Products edited successfully!')
        },
    })

    const handleSave = () => {
        const productsIds = selectedProducts?.map(({ id, sortNum }) => ({ id, sortNum }))
        if (!productsIds) return
        try {
            setIsSubmitting(true)
            setServerSuccess('')
            updateProducts.mutate(productsIds)
        } catch (e) {
            setIsSubmitting(false)
            throw e
        }
    }
    //

    return (
        <div>
            <h1>Main page products slider</h1>
            {serverSuccess ? <div>REFACTOR ME PLS: {serverSuccess}</div> : null}
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

            <h3>Select products for main page slider</h3>
            <ProductSelector
                handleChange={handleSelectedGamesChange}
                selectedIds={selectedProducts?.map((el) => el.id) || []}
            />
            {serverError ? <div>{serverError}</div> : null}
            <ButtonDefault
                onClick={handleSave}
                withIcon={true}
                Icon={<CircleLoader />}
                shouldIconDisplay={isSubmitting}
            >
                Save
            </ButtonDefault>
        </div>
    )
}
