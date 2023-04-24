import { useEffect } from 'react'
import { GlobalReducerActionKind } from '~/modules/app'
import { useGlobalContext } from '~/modules/shared/hooks/useGlobalContext'

export const useInitializeCart = () => {
    const { state, dispatch } = useGlobalContext()

    useEffect(() => {
        const localStorageCartData = localStorage.getItem('cart')
        if (!localStorageCartData) return

        dispatch({
            type: GlobalReducerActionKind.INITIALIZE,
            initialState: JSON.parse(localStorageCartData),
        })
    }, [])
}
