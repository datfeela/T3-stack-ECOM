import { ProductSelector } from '~/modules/features/ProductSelector'
import s from './AdminMainPageProducts.module.scss'
import { useSelectedProducts } from './hooks/useSelectedProducts'
import { ButtonDefault } from '~/modules/shared/components/Button/Button'
import { CircleLoader } from '~/modules/shared/components/Loaders/Loaders'
import { useUpdateProducts } from './hooks/useUpdateProducts'
import { SelectedProducts } from './components/SelectedProducts/SelectedProducts'

export const AdminMainPageProducts = () => {
    const { selectedProducts, handleSelectedGamesChange, changeProductSort } = useSelectedProducts()
    const { serverError, serverSuccess, isSubmitting, handleSave } =
        useUpdateProducts(selectedProducts)

    return (
        <div className={s.wrap}>
            <h1>Main page products slider</h1>
            <SelectedProducts
                selectedProducts={selectedProducts}
                handleSelectedGamesChange={handleSelectedGamesChange}
                changeProductSort={changeProductSort}
            />
            <h3>Select products for main page slider</h3>
            <ProductSelector
                handleChange={handleSelectedGamesChange}
                selectedIds={selectedProducts?.map((el) => el.id) || []}
            />
            <div className={s.footer}>
                {serverError ? <div className={s.error}>ERROR! {serverError}</div> : null}
                {serverSuccess ? <div>{serverSuccess}</div> : null}
                <div className={s.submitBtn}>
                    <ButtonDefault
                        onClick={handleSave}
                        withIcon={true}
                        Icon={<CircleLoader />}
                        shouldIconDisplay={isSubmitting}
                        color='purple'
                    >
                        Save
                    </ButtonDefault>
                </div>
            </div>
        </div>
    )
}
