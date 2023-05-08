import { ButtonDefault } from '~/modules/shared/components/Button/Button'
import { CircleLoader } from '~/modules/shared/components/Loaders/Loaders'
import s from './SubmitButton.module.scss'

interface SubmitButtonProps {
    isSubmitting: boolean
    isError: boolean
    children: React.ReactNode
}

const SubmitButton = ({ isSubmitting, isError, children }: SubmitButtonProps) => {
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
                    Icon={<CircleLoader />}
                    shouldIconDisplay={isSubmitting}
                    type='submit'
                >
                    {children}
                </ButtonDefault>
            </div>
        </>
    )
}

export default SubmitButton
