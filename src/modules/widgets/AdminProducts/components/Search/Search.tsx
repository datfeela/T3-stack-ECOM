import { BasicInput } from '~/modules/shared/components/Inputs/BasicInput'
import s from './Search.module.scss'

export interface SearchProps {
    handleChange: (input: string) => void
}

export const Search = ({ handleChange }: SearchProps) => {
    return (
        <div className={s.wrap}>
            <span>Search:</span>
            <BasicInput
                name='products-search'
                changeHandler={(input) => {
                    handleChange(input)
                }}
            />
        </div>
    )
}
