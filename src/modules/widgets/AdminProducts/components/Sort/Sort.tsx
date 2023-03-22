import type { ProductSortBy } from '~/server/api/apiTypes/productsRouterTypes'
import s from './Sort.module.scss'

interface sortVariant extends ProductSortBy {
    title: string
}

const sortVariants: sortVariant[] = [
    { name: 'price', value: 'asc', title: 'price asc' },
    { name: 'price', value: 'desc', title: 'price desc' },
    { name: 'name', value: 'asc', title: 'name asc' },
    { name: 'name', value: 'desc', title: 'name desc' },
]

export interface SortProps {
    setSortBy: (input: ProductSortBy) => void
}

export const Sort = ({ setSortBy }: SortProps) => {
    const buttons = sortVariants.map(({ title, ...rest }) => (
        <button
            className={s.btn}
            key={title}
            onClick={() => {
                setSortBy(rest)
            }}
        >
            {title}
        </button>
    ))

    return (
        <div className={s.wrap}>
            <span className={s.title}>Sort by:</span>
            {buttons}
        </div>
    )
}
