import s from './ProductQuantityController.module.scss'

interface ProductQuantityControllerProps {
    currentQuantity: number
    size: 'md' | 'sm'
    onIncrement: () => void
    onDecrement: () => void
}

export const ProductQuantityController = ({
    currentQuantity,
    onIncrement,
    onDecrement,
    size,
}: ProductQuantityControllerProps) => {
    return (
        <div className={`${s.wrap} ${size === 'sm' ? s.wrap_sm : ''}`}>
            <button
                className={s.button + ' ' + s.button_decrement}
                onClick={(e) => {
                    e.stopPropagation()
                    onDecrement()
                }}
            ></button>
            <span>{currentQuantity}</span>
            <button
                className={s.button + ' ' + s.button_increment}
                onClick={(e) => {
                    e.stopPropagation()
                    onIncrement()
                }}
            ></button>
        </div>
    )
}
