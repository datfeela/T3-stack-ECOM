import type { ProductSortBy } from '~/server/api/apiTypes/productsRouterTypes'
import s from './Header.module.scss'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'

export interface HeaderProps {
    sortBy: ProductSortBy
    setSortBy: (input: ProductSortBy) => void
}

export const Header = ({ sortBy, setSortBy }: HeaderProps) => {
    const handleSort = (name: 'name' | 'price') => {
        let valueDefault = 'asc' as ProductSortBy['value']
        if (name === sortBy.name && sortBy.value === 'asc') valueDefault = 'desc'

        setSortBy({ name, value: valueDefault })
    }

    return (
        <div className={s.header}>
            <span>Image</span>
            <button
                onClick={() => {
                    handleSort('name')
                }}
                className={`${s.sortBtn} ${sortBy.name === 'name' ? s.sortBtn_active : ''} ${
                    sortBy.value === 'asc' ? s.sortBtn_reversed : ''
                }`}
            >
                <span>Name</span>
                <SvgSelector id='breadcrumbsArrow' />
            </button>
            <button
                onClick={() => {
                    handleSort('price')
                }}
                className={`${s.sortBtn} ${sortBy.name === 'price' ? s.sortBtn_active : ''} ${
                    sortBy.value === 'asc' ? s.sortBtn_reversed : ''
                }`}
            >
                <span>Price</span>
                <SvgSelector id='breadcrumbsArrow' />
            </button>
            <span>Price w/o discount</span>
            <span>To product</span>
        </div>
    )
}
