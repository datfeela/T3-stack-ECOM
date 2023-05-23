import { useEffect } from 'react'
import { GlobalReducerActionKind } from '~/modules/app'
import { useGlobalContext } from '~/modules/shared/hooks/useGlobalContext'

export const useInitializeCart = () => {
    const { dispatch } = useGlobalContext()

    const init = () => {
        const localStorageCartData = localStorage.getItem('cart')
        if (!localStorageCartData) return

        dispatch({
            type: GlobalReducerActionKind.INITIALIZE,
            initialState: JSON.parse(localStorageCartData),
        })
    }

    const onVisibilityChange = () => {
        if (document.visibilityState === 'hidden') return
        init()
    }

    useEffect(() => {
        init()

        document.addEventListener('visibilitychange', onVisibilityChange)

        return () => {
            document.removeEventListener('visibilitychange', onVisibilityChange)
        }
    }, [])
}
