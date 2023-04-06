import s from './Loaders.module.scss'

export const DotsLoader = () => {
    return (
        <div className={s.dot}>
            <span />
            <span />
            <span />
        </div>
    )
}

export const CircleLoader = () => {
    return (
        <div className={s.circle}>
            <span className={s.circle__inner} />
        </div>
    )
}

export interface LoaderFullScreenProps {
    type: 'circle' | 'dots'
    position?: 'absolute' | 'fixed'
    blackout?: boolean
}

export const LoaderFullScreen = ({
    type,
    blackout,
    position = 'absolute',
}: LoaderFullScreenProps) => {
    let childComponent: JSX.Element | null = null

    if (type === 'circle') childComponent = <CircleLoader />
    if (type === 'dots') childComponent = <DotsLoader />

    return (
        <div style={{ position }} className={`${s.wrap} ${blackout ? s.wrap_withBlackout : ''}`}>
            {childComponent}
        </div>
    )
}
