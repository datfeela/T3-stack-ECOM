import s from './ImageInput.module.scss'
import React, { useRef } from 'react'
import type { MouseEvent } from 'react'
import Image from '~/modules/shared/components/Image/Image'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'

type ImageInputProps = {
    title?: string
    name: string
    value: string | File | undefined
    error: string | undefined
    onChangeHandler: (field: string, value: any) => void
    id?: number
}

const ImageInput = ({ title, name, value, error, onChangeHandler, id }: ImageInputProps) => {
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
                        <Image sizes='150px' id={`${id}`} src={imgSrc} alt='' objectFit='contain' />
                    </>
                ) : (
                    <div className={s.popup}>
                        <SvgSelector id='upload' />
                    </div>
                )}
            </label>
            <span className={s.title}>{title || ''}</span>
            {imgSrc ? (
                <div className={s.buttonsWrap}>
                    <label className={s.labelButton} htmlFor={`${name}_image_input`}>
                        <div className={`${s.buttonSmall} ${s.buttonSmall_upload}`}>
                            <SvgSelector id='upload' />
                        </div>
                    </label>
                    <button
                        onClick={deleteImage}
                        className={`${s.buttonSmall} ${s.buttonSmall_delete}`}
                        type='button'
                    >
                        <SvgSelector id='close' />
                    </button>
                    {/* <ButtonDefault
                        isGlitching={false}
                        color='purple'
                        
                        type='button'
                    >
                        Delete image
                    </ButtonDefault> */}
                </div>
            ) : (
                <div className={s.buttonsWrap}>
                    <span></span>
                    <label className={s.labelButton} htmlFor={`${name}_image_input`}>
                        <div className={`${s.buttonSmall} ${s.buttonSmall_upload}`}>
                            <SvgSelector id='upload' />
                        </div>
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
