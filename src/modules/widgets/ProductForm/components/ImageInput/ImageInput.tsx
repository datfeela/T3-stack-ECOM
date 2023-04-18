import s from './ImageInput.module.scss'
import Image from 'next/image'
import React, { useRef } from 'react'
import type { MouseEvent } from 'react'
import { ButtonDefault } from '~/modules/shared/components/Button/Button'

interface ImageInputProps {
    title?: string
    name: string
    value: string | File | undefined
    error: string | undefined
    onChangeHandler: (field: string, value: any) => void
}

const ImageInput = ({ title, name, value, error, onChangeHandler }: ImageInputProps) => {
    const imgSrc = value
        ? typeof value === 'string'
            ? value
            : URL.createObjectURL(value)
        : undefined

    const inputRef = useRef(null) as React.RefObject<HTMLInputElement> | null

    const deleteImage = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const input = inputRef?.current as HTMLInputElement
        input.value = ''
        onChangeHandler(name, undefined)
    }

    return (
        <div className={s.wrap}>
            <label
                className={`${s.label} ${imgSrc ? ' ' + s.label_withImg : ''}`}
                id={`${name}_image_label`}
                htmlFor={`${name}_image_input`}
            >
                {imgSrc ? (
                    <>
                        <Image src={imgSrc} alt='' fill style={{ objectFit: 'contain' }} />
                    </>
                ) : (
                    <div className={s.popup}>
                        <button type='button'>+</button>
                    </div>
                )}
            </label>
            <span className={s.title}>{title || ''}</span>
            {imgSrc ? (
                <div className={s.buttonsWrap}>
                    <label htmlFor={`${name}_image_input`}>
                        <ButtonDefault isGlitching={false} element='span' width='sm'>
                            Change image
                        </ButtonDefault>
                    </label>
                    <ButtonDefault
                        isGlitching={false}
                        width='sm'
                        onClick={deleteImage}
                        type='button'
                    >
                        Delete image
                    </ButtonDefault>
                </div>
            ) : (
                <div className={s.buttonsWrap}>
                    <span></span>
                    <label htmlFor={`${name}_image_input`}>
                        <ButtonDefault isGlitching={false} element='span' width='sm'>
                            Add Image
                        </ButtonDefault>
                    </label>
                </div>
            )}
            <input
                ref={inputRef}
                className={s.input}
                id={`${name}_image_input`}
                name={name}
                type='file'
                accept='image/*,.png,.jpg,.gif,.webp'
                onChange={(e) => {
                    if (!e.currentTarget.files || !e.currentTarget.files[0]) return
                    const img = e.currentTarget.files[0]

                    onChangeHandler(name, img)
                }}
            />
            {error && typeof error === 'string' && <div>{error}</div>}
        </div>
    )
}

export default React.memo(ImageInput)
