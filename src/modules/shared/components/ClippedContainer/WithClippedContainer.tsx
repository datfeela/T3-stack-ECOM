import { ClippedContainer } from './ClippedContainer'
import type { WithClippedContainerProps } from './types'

export const WithClippedContainer = ({
    children,
    withContainer,
    ...props
}: WithClippedContainerProps) => {
    if (!withContainer) return <>{children}</>

    return <ClippedContainer {...props}>{children}</ClippedContainer>
}
