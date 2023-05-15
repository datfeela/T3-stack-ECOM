import { ButtonDefault } from '~/modules/shared/components/Button/Button'
import { CircleLoader } from '~/modules/shared/components/Loaders/Loaders'
import s from './SubmitButton.module.scss'

interface SubmitButtonProps {
    isSubmitting: boolean
    isError: boolean
    isClientError: boolean
    children: React.ReactNode
}

const SubmitButton = ({ isSubmitting, isError, isClientError, children }: SubmitButtonProps) => {
    return (
        <>
            {isError ? (
                <div className={s.error}>
                    Some fields are not filled in or filled in incorrectly
                </div>
            ) : null}
            <div className={s.button}>
                <ButtonDefault
                    isError={isError}
                    isSubmitting={isSubmitting}
                    disabled={isSubmitting}
                    withIcon={true}
                    color='purple'
                    Icon={<CircleLoader />}
                    shouldIconDisplay={isSubmitting}
                    type='submit'
                    onClick={() => {
                        if (isClientError) scrollToError()
                    }}
                >
                    {children}
                </ButtonDefault>
            </div>
        </>
    )
}

export function scrollToError() {
    const firstErrorEl = document.querySelector('.input_error')
    firstErrorEl?.parentElement?.scrollIntoView({ behavior: 'smooth' })
}

export default SubmitButton
