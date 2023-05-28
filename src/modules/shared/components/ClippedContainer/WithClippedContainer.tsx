import { ClippedContainer } from './ClippedContainer'

interface WithClippedContainerProps {
    withContainer: boolean
    children: React.ReactNode
}

export const WithClippedContainer = ({ children, withContainer }: WithClippedContainerProps) => {
    if (!withContainer) return <>{children}</>

    return (
        <ClippedContainer backdropFilter={true} corners={{ botLeft: true }} clipSize='sm'>
            {children}
        </ClippedContainer>
    )
}
