import { Search } from '~/modules/shared/components/Search/Search'
import s from './SearchWithPopup.module.scss'
import { useState } from 'react'
import { useDebouncedValue } from '~/modules/shared/hooks/useDebouncedValue'
import { useManyProductsData } from '~/modules/shared/hooks/api/useManyProductsData'
import { usePopup } from '~/modules/shared/hooks/usePopup'
import { useHandleCloseHeaderPopup } from '~/modules/shared/hooks/useHandleCloseHeaderPopup'
import { useHandlePopupOpen } from '../../hooks/useHandlePopupOpen'
import dynamic from 'next/dynamic'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'
import { DotsLoader } from '~/modules/shared/components/Loaders/Loaders'

const SearchPopup = dynamic(() => import('../SearchPopup/SearchPopup'), {
    loading: () => (
        <div className={s.loader}>
            <DotsLoader />
        </div>
    ),
})

export const SearchWithPopup = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const { value: debouncedSearchQuery, isDebouncing } = useDebouncedValue<string>(
        searchQuery,
        250,
    )

    // popup open/close
    const { activatePopup, deactivatePopup, isPopupActive } = usePopup()
    const wrapRef = useHandleCloseHeaderPopup({ close: deactivatePopup })
    useHandlePopupOpen({ searchQuery, isPopupActive, activatePopup })

    // products
    const quantityLoadingPerPage = 10
    const { products, isLoading, getNextPage, isAllProductsLoaded } = useManyProductsData({
        searchQuery: debouncedSearchQuery,
        quantity: quantityLoadingPerPage,
        keepPreviousData: true,
        sortBy: {
            name: 'popularity',
            value: 'desc',
        },
    })
    const areProductsFound = products && products.length > 0 ? true : false
    const isNothingFound =
        searchQuery && !isLoading && (!products || products?.length <= 0) ? true : false

    return (
        <>
            <div ref={wrapRef} className={s.wrap}>
                <div
                    className={s.iconXs}
                    onClick={() => {
                        isPopupActive ? deactivatePopup() : activatePopup()
                    }}
                >
                    <SvgSelector id='search' />
                </div>
                <div className={`${s.search} ${isPopupActive ? s.search_visible : ''}`}>
                    <Search
                        inputName='header-search'
                        view='header'
                        value={searchQuery}
                        handleChange={setSearchQuery}
                        isLoading={isDebouncing || isLoading}
                        onSubmit={(input) => {
                            console.log(input)
                        }}
                        onFocus={activatePopup}
                    />
                    {isPopupActive ? (
                        <>
                            <div className={s.popup}>
                                <SearchPopup
                                    products={products}
                                    isLoading={isLoading}
                                    areProductsFound={areProductsFound}
                                    isNothingFound={isNothingFound}
                                    isAllProductsLoaded={isAllProductsLoaded}
                                    getNextPage={getNextPage}
                                    quantityLoadingPerPage={quantityLoadingPerPage}
                                />
                            </div>
                            <button
                                onClick={deactivatePopup}
                                type='button'
                                className={s.popupCloseBtn}
                            >
                                <SvgSelector id='close' />
                            </button>
                        </>
                    ) : null}
                </div>
            </div>
            {isPopupActive ? <div className={s.popupBg} /> : null}
        </>
    )
}
