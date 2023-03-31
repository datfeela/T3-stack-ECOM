import { useEffect, useState } from 'react'
import { ImageFill } from '../Image/Image'
import s from './Video.module.scss'

export interface VideoProps {
    id: string
    isActive?: boolean
    autoplay?: boolean
}

export const Video = ({ id, isActive = false, autoplay = false }: VideoProps) => {
    const [isVideoActive, setIsVideoActive] = useState(isActive)
    const [isVideoRendered, setIsVideoRendered] = useState(true)

    useEffect(() => {
        setIsVideoActive(isActive)

        if (isActive === false) {
            setIsVideoRendered(false)

            setTimeout(() => {
                setIsVideoRendered(true)
            }, 1000)
        }
    }, [isActive])

    return (
        <div className={s.wrap}>
            <div
                className={`${s.cover} ${!isVideoActive ? s.cover_active : ''}`}
                onClick={() => setIsVideoActive(true)}
            >
                <ImageFill
                    objectFit='cover'
                    orientation='16/9'
                    src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                    srcRes={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                />
            </div>
            {isVideoRendered ? (
                <IFrame autoplay={autoplay ? 1 : 0} id={id} isActive={isVideoActive} />
            ) : null}
        </div>
    )
}

interface IFrameProps {
    id: string
    autoplay: 1 | 0
    isActive: boolean
}

const IFrame = ({ id, autoplay, isActive }: IFrameProps) => {
    return (
        <iframe
            className={`${s.video} ${isActive ? s.video_active : ''}`}
            allowFullScreen
            allow='autoplay; fullscreen'
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=${autoplay}&autohide=1&fs=1&rel=0&hd=1&wmode=transparent&enablejsapi=1&html5=1`}
        />
    )
}
