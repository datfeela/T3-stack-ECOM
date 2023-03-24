import { BasicInput } from '~/modules/shared/components/Inputs/BasicInput'
import { CircleLoader } from '~/modules/shared/components/Loaders/Loaders'
import s from './Search.module.scss'

export interface SearchProps {
    handleChange: (input: string) => void
    isLoading: boolean
}

export const Search = ({ handleChange, isLoading }: SearchProps) => {
    return (
        <div className={s.wrap}>
            <span>Search:</span>
            <BasicInput
                name='products-search'
                changeHandler={(input) => {
                    handleChange(input)
                }}
            />
            {isLoading ? (
                <div className={s.loaderWrap}>
                    <CircleLoader />
                </div>
            ) : null}
        </div>
    )
}
