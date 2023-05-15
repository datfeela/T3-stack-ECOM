import type { FormikErrors } from 'formik'
import ImageInput from '../ImageInput/ImageInput'
import s from './MultiImageInput.module.scss'
import { Reorder } from 'framer-motion'
import { ButtonDefault } from '~/modules/shared/components/Button/Button'

interface MultiImageInputProps {
    values: { value: string; id: number }[] | { value: File; id: number }[]
    errors:
        | string
        | string[]
        | FormikErrors<{
              value: string
              id: number
          }>[]
        | undefined
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}

export const MultiImageInput = ({ values, errors, setFieldValue }: MultiImageInputProps) => {
    const detailImagesElements = values.map((image, id) => {
        return (
            <Reorder.Item
                key={`detailImgWrap${image.id}`}
                value={image}
                className={s.reorderItemWrap}
            >
                <ImageInput
                    key={`detailImg${image.id}`}
                    name={`detailPageImages[${id}][value]`}
                    value={image.value}
                    error={typeof errors === 'string' ? errors[id] : ''}
                    onChangeHandler={setFieldValue}
                    id={image.id}
                />
            </Reorder.Item>
        )
    })

    return (
        <div>
            <h2>Detailed images</h2>
            <span className={s.desc}>
                Select up to 6 images, that will be displayed in product page slider <br />
                <b>Important:</b> first image will be displayed as cover in some views
            </span>
            <Reorder.Group
                axis='y'
                values={values}
                className={s.reorderItems}
                onReorder={(values) => {
                    setFieldValue('detailPageImages', values)
                }}
            >
                {detailImagesElements}
            </Reorder.Group>
            {values.length < 6 ? (
                <ButtonDefault
                    type='button'
                    width='sm'
                    height='sm'
                    isGlitching={false}
                    color='purple'
                    onClick={() => {
                        setFieldValue('detailPageImages', [
                            ...values,
                            { id: values.length, value: '' },
                        ])
                    }}
                >
                    Add field
                </ButtonDefault>
            ) : null}
        </div>
    )
}
