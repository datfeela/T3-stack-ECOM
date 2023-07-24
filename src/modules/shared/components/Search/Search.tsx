import { CustomInput } from '~/modules/shared/components/Inputs/CustomInput'
import { CircleLoader } from '~/modules/shared/components/Loaders/Loaders'
import { SvgSelector } from '../SvgSelector/SvgSelector'
import s from './Search.module.scss'
import type { CustomInputProps } from '../Inputs/InputTypes'

interface SearchProps {
    inputName: string
    value: string
    handleChange: (input: string) => void
    isLoading?: boolean
    view?: 'header' | 'default' | 'catalog'
    onSubmit?: (input: string) => void
    onFocus?: () => void
}

export const Search = ({
    handleChange,
    isLoading,
    inputName,
    value,
    view = 'default',
    onSubmit,
    onFocus,
}: SearchProps) => {
    let customInputView: CustomInputProps['view'] = 'default'
    if (view === 'header' || view === 'catalog') customInputView = 'blackWhite'

    return (
        <div className={`${s.wrap} ${view === 'header' ? s.wrap_header : ''}`}>
            {view === 'default' ? <span>Search:</span> : null}
            <div
                className={`${s.input} ${view === 'header' ? s.input_header : ''} ${
                    view === 'catalog' ? s.input_catalog : ''
                }`}
            >
                <CustomInput
                    name={inputName}
                    value={value}
                    changeHandler={(input) => {
                        handleChange(input)
                    }}
                    view={customInputView}
                    onFocus={onFocus}
                    autoComplete='off'
                    size={view === 'catalog' ? 'sm' : 'default'}
                    withMargin={view !== 'catalog'}
                />
                {view === 'default' || view === 'catalog' ? (
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
                {view === 'catalog' ? (
                    <div className={`${s.searchBtn} ${s.searchBtn_decorative}`}>
                        <SvgSelector id='search' />
                    </div>
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
