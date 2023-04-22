'use client'

import Link from 'next/link'
import { GlobalReducerActionKind } from '~/modules/app'
import { ButtonDefault } from '~/modules/shared/components/Button/Button'
import { useGlobalContext } from '~/modules/shared/hooks/useGlobalContext'

interface BuyButtonProps {
    productId: string
}

export const BuyButton = ({ productId }: BuyButtonProps) => {
    const { state, dispatch } = useGlobalContext()

    const addProductToCart = () => {
        dispatch({ type: GlobalReducerActionKind.INCREMENT_PRODUCT_QUANTITY, productId })
    }

    return (
        <>
            {!state.products[productId] ? (
                <ButtonDefault onClick={addProductToCart} fontSize='md'>
                    Buy now
                </ButtonDefault>
            ) : null}
            {state.products[productId] ? (
                <Link href='/cart'>
                    <ButtonDefault color='red' isGlitching={false} fontSize='md'>
                        in cart
                    </ButtonDefault>
                </Link>
            ) : null}
        </>
    )
}
