import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'
import s from './LikeIcon.module.scss'

interface LikeIconProps {
    isReversed: boolean
    size?: 'md' | 'sm'
    color?: 'white' | 'red' | 'blue'
}

export const LikeIcon = ({ isReversed, size = 'md', color = 'white' }: LikeIconProps) => {
    let clName = s.icon

    if (isReversed) clName += ` ${s.icon_dislike}`

    if (size === 'sm') clName += ` ${s.icon_sm}`

    switch (color) {
        case 'red':
            clName += ` ${s.icon_red}`
            break
        case 'blue':
            clName += ` ${s.icon_blue}`
            break
        default:
            break
    }

    return (
        <div className={clName}>
            <SvgSelector id='like' />
        </div>
    )
}
