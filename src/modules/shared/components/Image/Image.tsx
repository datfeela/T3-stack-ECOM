import NextImage, { type StaticImageData } from 'next/image'
import React, { useState } from 'react'

export interface ImageFillProps {
    src: string | StaticImageData
    srcRes?: string
    alt?: string
    orientation?: '16/9' | '16/10' | '4/5' | '21/9' | 'unset'
    objectFit?: 'cover' | 'contain'
    sizes?: string
    priority?: boolean
}

const ImageFill = ({
    src,
    srcRes,
    alt,
    objectFit = 'cover',
    orientation = 'unset',
    sizes,
    priority = false,
}: ImageFillProps) => {
    const [isError, setIsError] = useState(false)

    return (
        <div
            style={{
                position: 'relative',
                aspectRatio: orientation,
                margin: '0 auto',
                height: orientation === 'unset' ? '100%' : 'auto',
            }}
        >
            {!isError ? (
                <NextImage
                    src={src}
                    alt={alt || ''}
                    placeholder='blur'
                    blurDataURL={typeof src === 'string' ? src : undefined}
                    fill
                    style={{ objectFit }}
                    sizes={sizes}
                    onError={() => {
                        setIsError(true)
                    }}
                    quality={95}
                    priority={priority}
                />
            ) : null}
            {isError && srcRes ? (
                <NextImage
                    src={srcRes}
                    alt={alt || ''}
                    placeholder='blur'
                    blurDataURL={srcRes}
                    fill
                    style={{ objectFit }}
                    sizes={sizes}
                    onError={() => {
                        setIsError(true)
                    }}
                />
            ) : null}
        </div>
    )
}

export default React.memo(ImageFill)
