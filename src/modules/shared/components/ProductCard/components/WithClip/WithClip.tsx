import { ClippedContainer } from '../../../ClippedContainer/ClippedContainer'
import type { View } from '../../types/types'

interface WithClipProps {
    view: View
    children: React.ReactNode
    containerHeight: 'full' | 'fit'
    withClip: boolean
}

export const WithClip = ({ view, children, containerHeight, withClip }: WithClipProps) => {
    if (!withClip) return <>{children}</>

    return (
        <ClippedContainer
            clipSize={view === 'defaultLg' ? 'lg' : 'md'}
            height={containerHeight}
            borderColor={view === 'vertical' ? 'blue' : 'purple'}
            borderColorHover={view === 'vertical' ? 'yellow' : undefined}
            background={view === 'horizontal' || view === 'cart' ? true : false}
            borders={view !== 'cartHeader'}
        >
            {children}
        </ClippedContainer>
    )
}
