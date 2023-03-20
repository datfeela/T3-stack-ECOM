import { Field } from 'formik'

interface CategoriesInputProps {
    categoriesNames: string[] | undefined
}

export const CategoriesInput = ({ categoriesNames }: CategoriesInputProps) => {
    const categoriesInput = categoriesNames
        ? categoriesNames.map((name, id) => (
              <label style={{ marginRight: '15px' }} key={`category${id}`}>
                  <Field type='checkbox' name='categories' value={name} />
                  {name}
              </label>
          ))
        : null

    return (
        <>
            <h3>Categories</h3>
            {categoriesInput}
        </>
    )
}
