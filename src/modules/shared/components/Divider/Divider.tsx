import s from './Divider.module.scss'

export const Divider = ({ height = 2 }: { height?: number }) => {
    return <div style={{ height: `${height}px` }} className={s.divider} />
}
