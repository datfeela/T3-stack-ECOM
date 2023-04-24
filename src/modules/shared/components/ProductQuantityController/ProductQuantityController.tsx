import { SvgSelector } from '../SvgSelector/SvgSelector'
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
            <button className={s.button + ' ' + s.button_decrement} onClick={onDecrement}></button>
            <span>{currentQuantity}</span>
            <button className={s.button + ' ' + s.button_increment} onClick={onIncrement}></button>
        </div>
    )
}
