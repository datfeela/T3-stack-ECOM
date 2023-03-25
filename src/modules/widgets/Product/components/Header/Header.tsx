import s from './Header.module.scss'

export interface HeaderProps {
    title: string
    coverImage?: string
    price: number
}

export const Header = (props: HeaderProps) => {
    return (
        <div className={s.wrap}>
            <h1>{props.title}</h1>
        </div>
    )
}
