import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'
import { useDeleteProduct } from '../../hooks/useDeleteProduct'
import s from './DeletePopup.module.scss'
import Popup from '~/modules/shared/components/Popup/Popup'
import { usePopup } from '~/modules/shared/hooks/usePopup'
import { ButtonDefault } from '~/modules/shared/components/Button/Button'
import { CircleLoader } from '~/modules/shared/components/Loaders/Loaders'

export const DeletePopup = ({ id }: { id: string }) => {
    const { isPopupActive, activatePopup, deactivatePopup } = usePopup()
    const { handleDeleteProduct, isSubmitting, serverError } = useDeleteProduct({
        onDeleteSuccess: deactivatePopup,
    })

    return (
        <div>
            <button onClick={activatePopup} className={`${s.button} ${s.button_delete}`}>
                <SvgSelector id='delete' />
            </button>
            <Popup
                isPopupActive={isPopupActive}
                deactivatePopup={deactivatePopup}
                size='fitContent'
            >
                <div className={s.popup}>
                    <h3>
                        Deletion is permanent <br /> Are you sure?
                    </h3>
                    {!!serverError ? <div className={s.error}>{serverError}</div> : null}
                    <ButtonDefault
                        onClick={() => {
                            handleDeleteProduct(id)
                        }}
                        height='sm'
                        width='sm'
                        color='red'
                        isGlitching={false}
                        disabled={isSubmitting}
                        withIcon={true}
                        Icon={<CircleLoader />}
                        shouldIconDisplay={isSubmitting}
                    >
                        Delete
                    </ButtonDefault>
                </div>
            </Popup>
        </div>
    )
}
