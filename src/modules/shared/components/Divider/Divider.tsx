import s from './Divider.module.scss'

interface DividerProps {
    height?: number
    margin?: 'default' | 'sm'
}

export const Divider = ({ height = 2, margin = 'default' }: DividerProps) => {
    return (
        <div
            style={{ height: `${height}px` }}
            className={`${s.divider} ${margin === 'sm' ? s.divider_marginSm : ''}`}
        />
    )
}
