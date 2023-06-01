import s from './Empty.module.scss'

export const Empty = () => {
    return (
        <div>
            <h3 className={s.title}>Looks like your cart is empty</h3>
            <span>Use the search to find everything you need.</span>
        </div>
    )
}
