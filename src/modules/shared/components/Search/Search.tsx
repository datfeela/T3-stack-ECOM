import { BasicInput } from '~/modules/shared/components/Inputs/BasicInput'
import { CircleLoader } from '~/modules/shared/components/Loaders/Loaders'
import { SvgSelector } from '../SvgSelector/SvgSelector'
import s from './Search.module.scss'

export interface SearchProps {
    inputName: string
    value: string
    handleChange: (input: string) => void
    isLoading?: boolean
}

export const Search = ({ handleChange, isLoading, inputName, value }: SearchProps) => {
    return (
        <div className={s.wrap}>
            <span>Search:</span>
            <div className={s.input}>
                <BasicInput
                    name={inputName}
                    value={value}
                    changeHandler={(input) => {
                        handleChange(input)
                    }}
                />
                <button
                    type='button'
                    className={s.closeBtn}
                    onClick={() => {
                        handleChange('')
                    }}
                >
                    <SvgSelector id='close' />
                </button>
            </div>
            {isLoading ? (
                <div className={s.loaderWrap}>
                    <CircleLoader />
                </div>
            ) : null}
        </div>
    )
}
