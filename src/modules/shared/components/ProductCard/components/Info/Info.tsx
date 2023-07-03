import Link from 'next/link'
import s from '../../ProductCard.module.scss'
import { ProductQuantityController } from '../../../ProductQuantityController/ProductQuantityController'
import { Favorites } from '~/modules/features/Favorites'
import { ButtonDefault } from '../../../Button/Button'
import type { View } from '../../types/types'
import { Discount } from '../../../Discount/Discount'
import { parseDateToString } from '~/modules/shared/lib/parseDateToString'
import { useMatchMedia } from '~/modules/shared/hooks/useMatchMedia'
import { BuyButton } from '~/modules/features/BuyButton'

type InfoPropsBase = {
    id: string
    view: View
    href?: string
    name: string
    price: number
    priceWithoutDiscount: number | null
    productTypeParsed: 'DLC' | 'edition' | 'base game' | undefined
    releaseDate?: Date
}

type InfoPropsWithQuantity = InfoPropsBase & {
    quantityInCart?: number
    onQuantityIncrement: (productId: string) => void
    onQuantityDecrement: (productId: string) => void
    onProductDelete: (productId: string) => void
}

type InfoPropsWithoutQuantity = InfoPropsBase & {
    quantityInCart?: undefined
    onQuantityIncrement?: undefined
    onQuantityDecrement?: undefined
    onProductDelete?: undefined
}

type InfoProps = InfoPropsWithQuantity | InfoPropsWithoutQuantity

export const Info = ({
    id,
    name,
    href,
    view,
    price,
    priceWithoutDiscount,
    productTypeParsed,
    releaseDate,
    onProductDelete,
    quantityInCart,
    onQuantityIncrement,
    onQuantityDecrement,
}: InfoProps) => {
    const matchMedia = useMatchMedia()
    const isGameOut = releaseDate ? new Date().getTime() - releaseDate.getTime() > 0 : undefined

    return (
        <div className={s.bottom}>
            {!!productTypeParsed && view === 'catalog' ? (
                <div className={s.productType}>{productTypeParsed}</div>
            ) : null}
            <div className={s.info}>
                {href ? (
                    <Link href={href} className={s.name}>
                        {name}
                    </Link>
                ) : (
                    <span className={s.name}>{name}</span>
                )}
                <div className={s.priceRow}>
                    <div className={s.priceBlock}>
                        <div className={s.priceBlockInner}>
                            <div className={s.price}>{price} y.e</div>
                            {priceWithoutDiscount ? (
                                <div className={s.priceWithoutDiscount}>
                                    {priceWithoutDiscount} y.e
                                </div>
                            ) : null}
                        </div>
                        {priceWithoutDiscount ? (
                            <div className={s.discount}>
                                <Discount
                                    price={price}
                                    priceWithoutDiscount={priceWithoutDiscount}
                                    size={view !== 'cartHeader' ? 'sm' : 'xs'}
                                />
                            </div>
                        ) : null}
                        {view === 'favorites' && isGameOut !== undefined ? (
                            <div className={s.buyBtn}>
                                <BuyButton isOut={isGameOut} productId={id} size='sm' />
                            </div>
                        ) : null}
                        {view === 'catalog' && isGameOut !== undefined ? (
                            <div className={s.buyBtn}>
                                <BuyButton isOut={isGameOut} productId={id} view='icon' />
                            </div>
                        ) : null}
                    </div>
                    {view === 'cartHeader' && typeof quantityInCart === 'number' ? (
                        <ProductQuantityController
                            currentQuantity={quantityInCart}
                            size='sm'
                            onIncrement={() => {
                                onQuantityIncrement(id)
                            }}
                            onDecrement={() => {
                                onQuantityDecrement(id)
                            }}
                        />
                    ) : null}
                </div>
                {!!productTypeParsed && view === 'cart' ? (
                    <div className={s.productType}>{productTypeParsed}</div>
                ) : null}
                {view === 'vertical' && releaseDate ? (
                    <Link href={href || ''} className={s.date}>
                        {parseDateToString(releaseDate)}
                    </Link>
                ) : null}
                {view === 'cart' && typeof quantityInCart === 'number' ? (
                    <div className={s.actions}>
                        <ProductQuantityController
                            currentQuantity={quantityInCart}
                            size='md'
                            onIncrement={() => {
                                onQuantityIncrement(id)
                            }}
                            onDecrement={() => {
                                onQuantityDecrement(id)
                            }}
                        />
                        <div className={s.actions__bottom}>
                            {matchMedia && (matchMedia.isMore1200 || matchMedia.isMore1440) ? (
                                <Favorites id={id} view='iconWithText' />
                            ) : (
                                <div className={s.favorites_absolute}>
                                    <Favorites id={id} view='icon' />
                                </div>
                            )}
                            <button
                                className={s.deleteBtn}
                                type='button'
                                onClick={() => {
                                    onProductDelete(id)
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>
            {view === 'defaultLg' && href ? (
                <Link className={s.toProductBtn_lg} href={href}>
                    <ButtonDefault isGlitching={false} color='purple' height='sm' fontW='500'>
                        More details
                    </ButtonDefault>
                </Link>
            ) : null}
        </div>
    )
}
