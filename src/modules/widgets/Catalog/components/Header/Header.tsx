import type { ProductSortBy } from '~/server/api/apiTypes/productsRouterTypes'
import s from './Header.module.scss'
import { useRef, useState } from 'react'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'
import { useHandleClickOutside } from '~/modules/shared/hooks/useHandleClickOutside'

interface HeaderProps {
    sortBy: ProductSortBy
    setSortBy: (value: ProductSortBy) => void
    toggleFiltersDisplay: () => void
}

type SortByWithTitle = ProductSortBy & {
    title: string
}

export const Header = ({ sortBy, setSortBy, toggleFiltersDisplay }: HeaderProps) => {
    const [isPopupActive, setIsPopupActive] = useState(false)
    const wrapRef = useRef<HTMLDivElement>(null)

    useHandleClickOutside({
        shouldBeListening: isPopupActive,
        elementRef: wrapRef,
        onClickOutside: () => {
            setIsPopupActive(false)
        },
    })

    const sortByVariants: SortByWithTitle[] = [
        { name: 'popularity', value: 'desc', title: 'Best Sellers' },
        { name: 'price', value: 'asc', title: 'Price: Low to High' },
        { name: 'price', value: 'desc', title: 'Price: High to Low' },
        { name: 'releaseDate', value: 'desc', title: 'Newest' },
        { name: 'releaseDate', value: 'asc', title: 'Oldest' },
        { name: 'name', value: 'asc', title: 'Alphabetic A-Z' },
        { name: 'name', value: 'desc', title: 'Alphabetic Z-A' },
    ]

    const popupEls = sortByVariants
        .filter(({ name, value }) => name !== sortBy.name || value !== sortBy.value)
        .map(({ name, value, title }) => (
            <div
                key={`${name} ${value}`}
                onClick={() => {
                    setSortBy({ name, value })
                    setIsPopupActive(false)
                }}
                className={s.sortByEl}
            >
                {title}
            </div>
        ))

    const currentSortByTitle = sortByVariants.find(({ name, value }) => {
        return name === sortBy.name && value === sortBy.value
    })?.title

    return (
        <div className={s.wrap} ref={wrapRef}>
            <div
                className={`${s.sortByEl} ${s.sortByEl_header} ${
                    isPopupActive ? s.sortByEl_active : ''
                }`}
                onClick={() => {
                    setIsPopupActive(!isPopupActive)
                }}
            >
                <span>{currentSortByTitle}</span>
                <SvgSelector id='arrowExpand' />
            </div>
            <button onClick={toggleFiltersDisplay} type='button' className={s.expandFiltersBtn}>
                <SvgSelector id='filters' />
            </button>
            <div className={`${s.popup} ${isPopupActive ? s.popup_active : ''}`}>{popupEls}</div>
        </div>
    )
}
