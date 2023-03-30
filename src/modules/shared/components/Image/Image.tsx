import NextImage from 'next/image'
import { useState } from 'react'

export interface ImageFillProps {
    src: string
    srcRes?: string
    alt?: string
    orientation: '16/9' | '16/10' | '4/5'
    objectFit: 'cover' | 'contain'
    sizes?: string
}

export const ImageFill = ({ src, srcRes, alt, objectFit, orientation, sizes }: ImageFillProps) => {
    const [isError, setIsError] = useState(false)

    return (
        <div
            style={{
                position: 'relative',
                aspectRatio: orientation,
                margin: '0 auto',
            }}
        >
            {!isError ? (
                <NextImage
                    src={src}
                    alt={alt || ''}
                    placeholder='blur'
                    blurDataURL={src}
                    fill
                    style={{ objectFit }}
                    sizes={sizes}
                    onError={() => {
                        setIsError(true)
                    }}
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
