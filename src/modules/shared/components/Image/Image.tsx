import NextImage, { type StaticImageData } from 'next/image'
import React, { useState } from 'react'
import type { ImageOrientation } from '../../types/types'
import s from './Image.module.scss'

export interface ImageFillProps {
    src: string | StaticImageData
    srcRes?: string
    alt?: string
    orientation?: ImageOrientation
    objectFit?: 'cover' | 'contain'
    objectPosition?: string
    sizes?: string
    priority?: boolean
    id?: string
    diffPlaceholderColor?: boolean
}

const ImageFill = ({
    src,
    srcRes,
    alt,
    objectFit = 'cover',
    objectPosition,
    orientation = 'unset',
    sizes,
    priority = false,
    diffPlaceholderColor,
}: ImageFillProps) => {
    const [isError, setIsError] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <div
            className={s.wrap}
            style={{
                aspectRatio: orientation,
                height: orientation === 'unset' ? '100%' : 'auto',
            }}
        >
            {!isLoaded ? (
                <div
                    className={`${s.placeholder} ${
                        diffPlaceholderColor ? s.placeholder_diffColor : ''
                    }`}
                    style={{
                        aspectRatio: orientation,
                        height: orientation === 'unset' ? '100%' : 'auto',
                    }}
                ></div>
            ) : null}
            {!isError ? (
                <NextImage
                    src={src}
                    alt={alt || ''}
                    fill
                    style={{ objectFit, objectPosition, opacity: isLoaded ? 1 : 0 }}
                    sizes={sizes}
                    onError={() => {
                        setIsError(true)
                    }}
                    quality={95}
                    priority={priority}
                    onLoadingComplete={() => {
                        setIsLoaded(true)
                    }}
                />
            ) : null}
            {isError && srcRes ? (
                <NextImage
                    src={srcRes}
                    alt={alt || ''}
                    fill
                    style={{ objectFit, objectPosition, opacity: isLoaded ? 1 : 0 }}
                    sizes={sizes}
                    onLoadingComplete={() => {
                        setIsLoaded(true)
                    }}
                />
            ) : null}
        </div>
    )
}

export default React.memo(ImageFill)
