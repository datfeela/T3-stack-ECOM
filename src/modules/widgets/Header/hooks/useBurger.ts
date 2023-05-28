import { useState } from 'react'
import { useBodyNoScroll } from '~/modules/shared/hooks/useBodyNoScroll'

export const useBurger = () => {
    const [isBurgerActive, setIsBurgerActive] = useState(false)

    const activateBurger = () => {
        setIsBurgerActive(true)
    }

    const deactivateBurger = () => {
        setIsBurgerActive(false)
    }

    useBodyNoScroll(isBurgerActive)

    return { isBurgerActive, activateBurger, deactivateBurger }
}
