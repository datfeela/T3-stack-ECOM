import { ButtonDefault } from '~/modules/shared/components/Button/Button'
import s from './AddReviewButton.module.scss'
import type { SetStateAction } from 'react'

interface AddReviewButtonProps {
    isAddFormActive: boolean
    setIsAddFormActive: (v: SetStateAction<boolean>) => void
    margin?: boolean
}

export const AddReviewButton = ({
    isAddFormActive,
    setIsAddFormActive,
    margin = true,
}: AddReviewButtonProps) => {
    return (
        <div
            className={`${s.addReviewButton} ${isAddFormActive ? s.addReviewButton_hidden : ''} ${
                !margin ? s.addReviewButton_noMargin : ''
            }`}
        >
            <ButtonDefault
                onClick={() => {
                    setIsAddFormActive(true)
                }}
                fontSize='md'
                color='purple'
                height='lg'
            >
                <span>Add review</span>
            </ButtonDefault>
        </div>
    )
}
