import { ProductSelector } from '~/modules/features/ProductSelector'
import s from './OriginalGameInput.module.scss'
import { AdminProductCard } from '~/modules/shared/components/AdminProductCard/AdminProductCard'
import { useSelectedOriginalGame } from '../../hooks/useSelectedOriginalGame'

export interface OriginalGameInputProps {
    name: string
    value: string
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}

export const OriginalGameInput = ({ name, value, setFieldValue }: OriginalGameInputProps) => {
    const selectedProduct = useSelectedOriginalGame(value)

    const handleSelectedGameChange = (id: string) => {
        setFieldValue(name, id)
    }

    return (
        <>
            {selectedProduct ? (
                <div className={s.selectedProductWrap}>
                    <h3>Selected product: </h3>
                    <div className={s.selectedProduct}>
                        <AdminProductCard
                            key={selectedProduct.id}
                            id={selectedProduct.id}
                            imgSrc={selectedProduct.horizontalImagePath}
                            name={selectedProduct.name}
                            price={selectedProduct.price}
                            withDelete={true}
                            handleDelete={() => {
                                handleSelectedGameChange('')
                            }}
                        />
                    </div>
                </div>
            ) : null}
            <span className={s.desc}>
                If product is another game&lsquo;s DLC / Edition, you can select original game below
            </span>
            <ProductSelector handleChange={handleSelectedGameChange} selectedIds={[value]} />
        </>
    )
}
