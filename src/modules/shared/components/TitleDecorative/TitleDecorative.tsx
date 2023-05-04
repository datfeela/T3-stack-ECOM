import s from './TitleDecorative.module.scss'

interface TitleDecorativeProps {
    children: React.ReactNode
    TagName?: 'h1' | 'h2' | 'h3'
    variant: 1 | 2 | 3
    isGlitching?: boolean
}

export const TitleDecorative = ({
    children,
    TagName = 'h2',
    variant,
    isGlitching = true,
}: TitleDecorativeProps) => {
    return (
        <div className={s.wrapOuter}>
            <div
                className={`${s.wrap} ${variant === 1 ? s.wrap_1 : null} ${
                    variant === 2 ? s.wrap_2 : null
                } ${variant === 3 ? s.wrap_3 : null}`}
            >
                <TagName className={s.title}>{children}</TagName>
                <span className={`${s.el} ${s.el_1}`}></span>
                <span className={`${s.el} ${s.el_2}`}></span>
                <span className={`${s.el} ${s.el_3}`}></span>
                <span className={`${s.el} ${s.el_4}`}></span>
                <span className={`${s.el} ${s.el_5}`}></span>
                <span className={`${s.el} ${s.el_6}`}></span>
                <span className={`${s.el} ${s.el_7}`}></span>
                <span className={`${s.el} ${s.el_8}`}></span>
                <span className={`${s.el} ${s.el_9}`}></span>
                <span className={`${s.el} ${s.el_10}`}></span>
                <span className={`${s.el} ${s.el_11}`}></span>
                <span className={`${s.el} ${s.el_12}`}></span>
                <span className={`${s.el} ${s.el_13}`}></span>
                <span className={`${s.el} ${s.el_14}`}></span>
                <span className={`${s.el} ${s.el_15}`}></span>
                <span className={`${s.el} ${s.el_16}`}></span>
                <span className={`${s.el} ${s.el_17}`}></span>
                <span className={`${s.el} ${s.el_18}`}></span>
                <span className={`${s.el} ${s.el_19}`}></span>
                <span className={`${s.el} ${s.el_20}`}></span>
            </div>
            {isGlitching ? (
                <>
                    <div
                        className={`${s.wrap} ${s.wrap_shadow} ${s.wrap_shadow__1} ${
                            variant === 1 ? s.wrap_1 : null
                        } ${variant === 2 ? s.wrap_2 : null} ${variant === 3 ? s.wrap_3 : null}`}
                    >
                        <TagName className={s.title}>{children}</TagName>
                        <span className={`${s.el} ${s.el_1}`}></span>
                        <span className={`${s.el} ${s.el_2}`}></span>
                        <span className={`${s.el} ${s.el_3}`}></span>
                        <span className={`${s.el} ${s.el_4}`}></span>
                        <span className={`${s.el} ${s.el_5}`}></span>
                        <span className={`${s.el} ${s.el_6}`}></span>
                        <span className={`${s.el} ${s.el_7}`}></span>
                        <span className={`${s.el} ${s.el_8}`}></span>
                        <span className={`${s.el} ${s.el_9}`}></span>
                        <span className={`${s.el} ${s.el_10}`}></span>
                        <span className={`${s.el} ${s.el_11}`}></span>
                        <span className={`${s.el} ${s.el_12}`}></span>
                        <span className={`${s.el} ${s.el_13}`}></span>
                        <span className={`${s.el} ${s.el_14}`}></span>
                        <span className={`${s.el} ${s.el_15}`}></span>
                        <span className={`${s.el} ${s.el_16}`}></span>
                        <span className={`${s.el} ${s.el_17}`}></span>
                        <span className={`${s.el} ${s.el_18}`}></span>
                        <span className={`${s.el} ${s.el_19}`}></span>
                        <span className={`${s.el} ${s.el_20}`}></span>
                    </div>
                    {/* <div
                        className={`${s.wrap} ${s.wrap_shadow} ${s.wrap_shadow__2} ${
                            variant === 1 ? s.wrap_1 : ''
                        } ${variant === 2 ? s.wrap_2 : ''} ${variant === 3 ? s.wrap_3 : ''}`}
                    >
                        <TagName className={s.title}>{children}</TagName>
                        <span className={`${s.el} ${s.el_1}`}></span>
                        <span className={`${s.el} ${s.el_2}`}></span>
                        <span className={`${s.el} ${s.el_3}`}></span>
                        <span className={`${s.el} ${s.el_4}`}></span>
                        <span className={`${s.el} ${s.el_5}`}></span>
                        <span className={`${s.el} ${s.el_6}`}></span>
                        <span className={`${s.el} ${s.el_7}`}></span>
                        <span className={`${s.el} ${s.el_8}`}></span>
                        <span className={`${s.el} ${s.el_9}`}></span>
                        <span className={`${s.el} ${s.el_10}`}></span>
                        <span className={`${s.el} ${s.el_11}`}></span>
                        <span className={`${s.el} ${s.el_12}`}></span>
                        <span className={`${s.el} ${s.el_13}`}></span>
                        <span className={`${s.el} ${s.el_14}`}></span>
                        <span className={`${s.el} ${s.el_15}`}></span>
                        <span className={`${s.el} ${s.el_16}`}></span>
                        <span className={`${s.el} ${s.el_17}`}></span>
                        <span className={`${s.el} ${s.el_18}`}></span>
                        <span className={`${s.el} ${s.el_19}`}></span>
                        <span className={`${s.el} ${s.el_20}`}></span>
                    </div> */}
                </>
            ) : null}
        </div>
    )
}
