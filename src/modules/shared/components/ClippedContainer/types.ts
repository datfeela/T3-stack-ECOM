import type { DefaultColor } from '../../types/types'

export type Corner = 'topLeft' | 'topRight' | 'botRight' | 'botLeft'

export type ClippedContainerProps = {
    width?: 'full' | 'fit'
    height?: 'full' | 'fit'
    clipSize?: 'sm' | 'md' | 'lg'
    color?: DefaultColor
    borderColor?: DefaultColor
    borderColorHover?: DefaultColor
    children: React.ReactNode
    corners?: { [key in Corner]?: boolean }
    borders?: boolean
    withPadding?: boolean
    background?: boolean
    backdropFilter?: boolean
}

export type WithClippedContainerProps = ClippedContainerProps & {
    withContainer: boolean
}
