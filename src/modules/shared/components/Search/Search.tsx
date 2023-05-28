import { CustomInput } from '~/modules/shared/components/Inputs/CustomInput'
import { CircleLoader } from '~/modules/shared/components/Loaders/Loaders'
import { SvgSelector } from '../SvgSelector/SvgSelector'
import s from './Search.module.scss'

interface SearchProps {
    inputName: string
    value: string
    handleChange: (input: string) => void
    isLoading?: boolean
    view?: 'header' | 'default'
    onSubmit?: (input: string) => void
    onFocus?: () => void
}

export const Search = ({
    handleChange,
    isLoading,
    inputName,
    value,
    view,
    onSubmit,
    onFocus,
}: SearchProps) => {
    return (
        <div className={`${s.wrap} ${view === 'header' ? s.wrap_header : ''}`}>
            {view === 'default' ? <span>Search:</span> : null}
            <div className={`${s.input} ${view === 'header' ? s.input_header : ''}`}>
                <CustomInput
                    name={inputName}
                    value={value}
                    changeHandler={(input) => {
                        handleChange(input)
                    }}
                    view='blackWhite'
                    onFocus={onFocus}
                    autoComplete='off'
                />
                {view === 'default' ? (
                    <button
                        type='button'
                        className={s.closeBtn}
                        onClick={() => {
                            handleChange('')
                        }}
                    >
                        <SvgSelector id='close' />
                    </button>
                ) : null}
                {!!onSubmit ? (
                    <button
                        type='button'
                        className={s.searchBtn}
                        onClick={() => {
                            onSubmit(value)
                        }}
                    >
                        <SvgSelector id='search' />
                    </button>
                ) : null}
            </div>
            {isLoading && view === 'default' ? (
                <div className={s.loaderWrap}>
                    <CircleLoader />
                </div>
            ) : null}
        </div>
    )
}
