import Link from 'next/link'
import { GlobalReducerActionKind } from '~/modules/app/context'
import { ButtonDefault } from '~/modules/shared/components/Button/Button'
import { SvgSelector } from '~/modules/shared/components/SvgSelector/SvgSelector'
import { useGlobalContext } from '~/modules/shared/hooks/useGlobalContext'
import s from './BuyButton.module.scss'

interface BuyButtonProps {
    productId: string
    isOut: boolean
    size?: 'sm' | 'default'
    view?: 'text' | 'icon'
}

export const BuyButton = ({ productId, isOut, size, view = 'text' }: BuyButtonProps) => {
    const { state, dispatch } = useGlobalContext()

    const addProductToCart = () => {
        dispatch({ type: GlobalReducerActionKind.INCREMENT_PRODUCT_QUANTITY, productId })
    }

    return (
        <>
            {!state.products[productId] ? (
                view === 'text' ? (
                    <ButtonDefault
                        onClick={addProductToCart}
                        fontSize={size === 'sm' ? undefined : 'md'}
                        height={size === 'sm' ? 'xs' : undefined}
                        width={size === 'sm' ? 'sm' : undefined}
                    >
                        {isOut ? 'Buy now' : 'Preorder'}
                    </ButtonDefault>
                ) : (
                    <button
                        type='button'
                        onClick={addProductToCart}
                        className={`${s.buttonWithIcon} ${s.buttonWithIcon_add}`}
                    >
                        <SvgSelector id='cart' />
                    </button>
                )
            ) : null}
            {state.products[productId] ? (
                <Link href='/cart'>
                    {view === 'text' ? (
                        <ButtonDefault
                            color='red'
                            isGlitching={false}
                            fontSize={size === 'sm' ? undefined : 'md'}
                            height={size === 'sm' ? 'xs' : undefined}
                            width={size === 'sm' ? 'sm' : undefined}
                        >
                            in cart
                        </ButtonDefault>
                    ) : (
                        <button
                            type='button'
                            className={`${s.buttonWithIcon} ${s.buttonWithIcon_toCart}`}
                        >
                            <SvgSelector id='checkboxTick' />
                        </button>
                    )}
                </Link>
            ) : null}
        </>
    )
}
