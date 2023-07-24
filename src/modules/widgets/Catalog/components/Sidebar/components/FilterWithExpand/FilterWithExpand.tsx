import { Input } from '~/modules/shared/components/Inputs/Input'
import s from './FilterWithExpand.module.scss'
import { useState } from 'react'
import { Search } from '~/modules/shared/components/Search/Search'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'

interface FilterWithExpandProps {
    name: string
    values: {
        [key: string]: boolean
    }
    isWithSearch?: boolean
}

export const FilterWithExpand = ({ name, values, isWithSearch }: FilterWithExpandProps) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [isExpanded, setIsExpanded] = useState(false)

    let valuesSatisfyingQuery = isWithSearch
        ? Object.entries(values).filter(([name]) =>
              name.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        : Object.entries(values)

    valuesSatisfyingQuery = valuesSatisfyingQuery.sort(([_x, valueX], [_y, valueY]) => {
        return valueX === valueY ? 0 : valueX ? -1 : 1
    })

    const isSearchNeeded = Object.keys(values).length > 5 && isWithSearch
    const isExpandNeeded = Object.keys(valuesSatisfyingQuery).length > 5

    return (
        <>
            {isSearchNeeded ? (
                <div className={s.searchWrap}>
                    <Search
                        inputName={`filters_${name}_search`}
                        value={searchQuery}
                        handleChange={setSearchQuery}
                        view='catalog'
                    />
                </div>
            ) : null}
            <div className={s.items}>
                {valuesSatisfyingQuery.map(([itemName, itemValue], id) => {
                    let inputTitle: string | React.ReactNode = itemName

                    if (name === 'filters[platforms]')
                        inputTitle = (
                            <div className={s.checkboxTitle_withIcon}>
                                <div className={s.checkboxTitle__icon}>
                                    <SvgSelector id={itemName as 'ps' | 'xbox' | 'windows'} />
                                </div>
                                {itemName}
                            </div>
                        )

                    if (name === 'filters[gamemodes]')
                        inputTitle = (
                            <div className={s.checkboxTitle_withIcon}>
                                <div className={s.checkboxTitle__icon}>
                                    <SvgSelector
                                        id={
                                            itemName as
                                                | 'singleplayer'
                                                | 'co-operative'
                                                | 'multiplayer'
                                        }
                                    />
                                </div>
                                {itemName}
                            </div>
                        )

                    if (name === 'productType' && inputTitle === 'game') inputTitle = 'Base game'

                    return (
                        <div
                            key={`${name}[${itemName}]`}
                            className={`${s.item} ${id > 5 && !isExpanded ? s.item_hidden : ''} ${
                                itemValue === true ? s.item_active : ''
                            }`}
                        >
                            <Input
                                key={`${name}[${itemName}]`}
                                name={`${name}['${itemName}']`}
                                inputTitle={inputTitle}
                                type='checkbox'
                                withCheckboxSquare={
                                    name !== 'filters[platforms]' && name !== 'filters[gamemodes]'
                                }
                            />
                        </div>
                    )
                })}
            </div>
            {isExpandNeeded ? (
                <button
                    type='button'
                    className={s.expandBtn}
                    onClick={() => {
                        setIsExpanded(!isExpanded)
                    }}
                >
                    {isExpanded ? 'Hide' : 'Show all'}
                </button>
            ) : null}
        </>
    )
}
