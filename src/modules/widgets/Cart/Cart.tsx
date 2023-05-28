import { Breadcrumbs } from '~/modules/features/Breadcrumbs'
import s from './Cart.module.scss'
import { useAddOrder } from './hooks/useAddOrder'
import { useProductsInCart } from '../../shared/hooks/useProductsInCart'
import { calculateTotalPrice } from './lib/calculateTotalPrice'
import { ProductCard } from '~/modules/shared/components/ProductCard'
import { LoaderFullScreen } from '~/modules/shared/components/Loaders/Loaders'
import { Summary } from './components/Summary/Summary'
import { useMatchMedia } from '~/modules/shared/hooks/useMatchMedia'
import { Empty } from './components/Empty/Empty'
import { useRouter } from 'next/router'
import { Success } from './components/Success/Success'

export const Cart = () => {
    const matchMedia = useMatchMedia()
    const router = useRouter()

    const { handleCreateOrder, isSubmitting, serverError } = useAddOrder()
    const isSuccess = Boolean(router.query.isSuccess)

    const { productsData, incrementProductQuantity, decrementProductQuantity, deleteProduct } =
        useProductsInCart()

    const { totalPrice, totalPriceWithoutDiscount } = calculateTotalPrice(productsData)

    const productsEls = productsData?.map(
        ({ id, quantity, verticalImagePath, horizontalImagePath, ...rest }) => (
            <ProductCard
                key={id}
                id={id}
                view={'cart'}
                imageSizes='(max-width: 480px) 100vw,
                250px'
                imgPath={
                    matchMedia && matchMedia.isLess480 ? horizontalImagePath : verticalImagePath
                }
                quantityInCart={quantity}
                linkBasePathName='/game'
                onQuantityDecrement={decrementProductQuantity}
                onQuantityIncrement={incrementProductQuantity}
                onProductDelete={deleteProduct}
                {...rest}
            />
        ),
    )

    const submitOrder = (deliveryEmail: string) => {
        handleCreateOrder({ totalPrice, totalPriceWithoutDiscount, deliveryEmail })
    }

    return (
        <>
            <Breadcrumbs />
            <div className='wrap'>
                <h1 className={s.title}>CART</h1>
                {isSuccess ? (
                    <Success />
                ) : (
                    <div className={s.content}>
                        {productsEls ? (
                            <>
                                {productsEls.length > 0 ? (
                                    <>
                                        <div className={s.products}>{productsEls}</div>
                                        <Summary
                                            handleSubmit={submitOrder}
                                            totalPrice={totalPrice}
                                            totalPriceWithoutDiscount={totalPriceWithoutDiscount}
                                            error={serverError}
                                            isSubmitting={isSubmitting}
                                        />
                                    </>
                                ) : (
                                    <Empty />
                                )}
                            </>
                        ) : (
                            <LoaderFullScreen type='dots' />
                        )}
                    </div>
                )}
            </div>
        </>
    )
}
