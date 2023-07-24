import { Input } from '~/modules/shared/components/Inputs/Input'
import type { FilterResponse } from '~/server/api/apiTypes/productsRouterTypes'
import s from './FiltersCheckboxes.module.scss'

interface FiltersCheckboxesProps {
    filtersData: FilterResponse[] | undefined
}

export const FiltersCheckboxes = ({ filtersData }: FiltersCheckboxesProps) => {
    const filtersInputs = filtersData
        ? filtersData.map(({ name, options }, id) => {
              return (
                  <div key={`filter${id}`}>
                      <div className={s.title}>{name}</div>
                      <div className={s.checkboxes}>
                          {options.map((option, optionId) => (
                              <Input
                                  key={`filterOption${optionId}`}
                                  name={`filters['${name}']`}
                                  type='checkbox'
                                  value={option.name}
                                  inputTitle={option.name}
                              />
                          ))}
                      </div>
                  </div>
              )
          })
        : null

    return (
        <>
            <h3>Filters</h3>
            {filtersInputs}
        </>
    )
}
