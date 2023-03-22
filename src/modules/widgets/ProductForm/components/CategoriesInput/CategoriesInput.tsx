import { Field } from 'formik'
import { Input } from '~/modules/shared/components/Inputs/Input'
import s from './CategoriesInput.module.scss'

interface CategoriesInputProps {
    categoriesNames: string[] | undefined
}

export const CategoriesInput = ({ categoriesNames }: CategoriesInputProps) => {
    const categoriesInput = categoriesNames
        ? categoriesNames.map((name, id) => (
              //   <label key={`category${id}`}>
              //       <Field type='checkbox' name='categories' value={name} />
              //       {name}
              // </label>
              <Input
                  key={`category${id}`}
                  name='categories'
                  type='checkbox'
                  value={name}
                  title={name}
              />
          ))
        : null

    return (
        <>
            <h3>Categories</h3>
            <div className={s.checkboxes}>{categoriesInput}</div>
        </>
    )
}
