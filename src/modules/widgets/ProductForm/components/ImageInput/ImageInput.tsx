import s from './ImageInput.module.scss'
import Image from 'next/image'
import React, { useRef } from 'react'
import type { MouseEvent } from 'react'

interface ImageInputProps {
    title: string
    name: string
    value: string | File | undefined
    error: string | undefined
    onChangeHandler: (field: string, value: any) => void
}

const ImageInput = ({ title, name, value, error, onChangeHandler }: ImageInputProps) => {
    const imgSrc = value
        ? typeof value === 'string'
            ? value
            : // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              URL.createObjectURL(value)
        : undefined

    const inputRef = useRef(null) as React.RefObject<HTMLInputElement> | null

    const deleteImage = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault()
        const input = inputRef?.current as HTMLInputElement
        input.value = ''
        onChangeHandler(name, undefined)
    }

    return (
        <div>
            <div>{title}</div>
            <label
                className={`${s.label} ${imgSrc ? ' ' + s.label_withImg : ''}`}
                id={`${name}_image_label`}
                htmlFor={`${name}_image_input`}
            >
                {imgSrc ? (
                    <>
                        <Image src={imgSrc} alt='' fill style={{ objectFit: 'contain' }} />
                        <div className={s.popup + ' ' + s.popup_hidden}>
                            <span className={s.popup__btn}>Change image</span>
                            <button onClick={deleteImage} type='button' className={s.popup__btn}>
                                Delete image
                            </button>
                        </div>
                    </>
                ) : (
                    <div className={s.popup}>
                        <span className={s.popup__btn}>Add image</span>
                    </div>
                )}
            </label>
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

// setImagePreviewSrc(URL.createObjectURL(img))
