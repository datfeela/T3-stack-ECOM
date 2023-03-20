import { Field } from 'formik'
import type { FilterResponse } from '~/server/api/apiTypes/productsRouterTypes'

interface FiltersCheckboxesProps {
    filtersData: FilterResponse[] | undefined
}

export const FiltersCheckboxes = ({ filtersData }: FiltersCheckboxesProps) => {
    const filtersInputs = filtersData
        ? filtersData.map(({ name, options }, id) => {
              return (
                  <div key={`filter${id}`}>
                      <div>{name}</div>
                      {options.map((option, optionId) => (
                          <label style={{ marginRight: '15px' }} key={`filterOption${optionId}`}>
                              <Field
                                  type='checkbox'
                                  name={`filters[${name}]`}
                                  value={option.name}
                              />
                              {option.name}
                          </label>
                      ))}
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
