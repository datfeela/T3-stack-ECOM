import { ButtonDefault } from '~/modules/shared/components/Buttons/Buttons'
import { CircleLoader } from '~/modules/shared/components/Loaders/Loaders'
import s from './SubmitButton.module.scss'

interface SubmitButtonProps {
    isSubmitting: boolean
    isError: boolean
    children: React.ReactNode
}

const SubmitButton = ({ isSubmitting, isError, children }: SubmitButtonProps) => {
    return (
        <ButtonDefault
            isError={isError}
            isSubmitting={isSubmitting}
            withIcon={true}
            Icon={<CircleLoader />}
            shouldIconDisplay={isSubmitting}
            type='submit'
        >
            {children}
        </ButtonDefault>
    )
}

export default SubmitButton
