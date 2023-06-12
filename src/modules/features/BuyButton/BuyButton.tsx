'use client'

import Link from 'next/link'
import { GlobalReducerActionKind } from '~/modules/app/context'
import { ButtonDefault } from '~/modules/shared/components/Button/Button'
import { useGlobalContext } from '~/modules/shared/hooks/useGlobalContext'

interface BuyButtonProps {
    productId: string
    isOut: boolean
    size?: 'sm' | 'default'
}

export const BuyButton = ({ productId, isOut, size }: BuyButtonProps) => {
    const { state, dispatch } = useGlobalContext()

    const addProductToCart = () => {
        dispatch({ type: GlobalReducerActionKind.INCREMENT_PRODUCT_QUANTITY, productId })
    }

    return (
        <>
            {!state.products[productId] ? (
                <ButtonDefault
                    onClick={addProductToCart}
                    fontSize={size === 'sm' ? undefined : 'md'}
                    height={size === 'sm' ? 'xs' : undefined}
                    width={size === 'sm' ? 'sm' : undefined}
                >
                    {isOut ? 'Buy now' : 'Preorder'}
                </ButtonDefault>
            ) : null}
            {state.products[productId] ? (
                <Link href='/cart'>
                    <ButtonDefault
                        color='red'
                        isGlitching={false}
                        fontSize={size === 'sm' ? undefined : 'md'}
                        height={size === 'sm' ? 'xs' : undefined}
                        width={size === 'sm' ? 'sm' : undefined}
                    >
                        in cart
                    </ButtonDefault>
                </Link>
            ) : null}
        </>
    )
}
