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
