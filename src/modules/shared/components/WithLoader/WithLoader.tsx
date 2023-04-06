import { DotsLoader } from '../Loaders/Loaders'

interface WithLoaderProps {
    conditionToShowLoader: boolean
    loaderType: 'dots'
    children: React.ReactNode
}

export const WithLoader = ({ loaderType, conditionToShowLoader, children }: WithLoaderProps) => {
    let loader: JSX.Element | null = null
    if (loaderType === 'dots') loader = <DotsLoader />

    return <>{conditionToShowLoader ? loader : children}</>
}
