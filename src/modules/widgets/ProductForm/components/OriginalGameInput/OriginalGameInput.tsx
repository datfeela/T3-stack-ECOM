import { ProductSelector } from '~/modules/features/ProductSelector'
import { api } from '~/modules/shared/api/apiTRPC'
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
                <div className={s.selectedProduct}>
                    <span>Selected product: </span>
                    <AdminProductCard
                        key={selectedProduct.id}
                        id={selectedProduct.id}
                        imgSrc={selectedProduct.horizontalImagePath}
                        name={selectedProduct.name}
                        price={selectedProduct.price}
                    />
                </div>
            ) : null}
            <span>
                If this product is anothers game DLC / Edition, you can select original game below
            </span>

            <ProductSelector handleChange={handleSelectedGameChange} selectedIds={[value]} />
        </>
    )
}
