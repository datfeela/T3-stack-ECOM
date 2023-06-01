import Image from '~/modules/shared/components/Image/Image'
import { mapProductDataFromApi } from '../../mappers/mapProductDataFromApi'
import s from './Slide.module.scss'
import { ImagePlaceholder } from '~/modules/shared/components/ImagePlaceholder/ImagePlaceholder'
import { getProductReleaseDateStatus } from '~/modules/shared/lib/getProductReleaseDateStatus'
import { Discount } from '~/modules/shared/components/Discount/Discount'
import Link from 'next/link'
import { ButtonDefault } from '~/modules/shared/components/Button/Button'
import type { MainPageProductFromApi } from '~/modules/entities/product'

interface SlideProps {
    productData: MainPageProductFromApi
}

export const Slide = ({ productData }: SlideProps) => {
    const { id, name, desc, price, priceWithoutDiscount, releaseDate, imagePath } =
        mapProductDataFromApi(productData)

    const releaseStatus = getProductReleaseDateStatus(releaseDate)

    return (
        <div className={s.wrap}>
            <div className={s.bg} />
            <div className={s.image}>
                {imagePath ? (
                    <Link href={`/game/${id}`}>
                        <Image
                            src={imagePath}
                            alt={`${name} cover`}
                            objectFit='cover'
                            // orientation='16/9'
                            orientation='unset'
                            sizes='(max-width: 600px) 100vw, (max-width: 1440px) 66vw, 1350px'
                            priority={true}
                        />
                    </Link>
                ) : (
                    <ImagePlaceholder />
                )}
            </div>
            <div className={s.info}>
                {releaseStatus.status ? (
                    <div className={s.releaseStatus}>{releaseStatus.status}</div>
                ) : null}
                <Link href={`/game/${id}`}>
                    <h2 className={s.name}>{name}</h2>
                </Link>
                <div className={s.desc}>{desc}</div>
                <div className={s.priceBlock}>
                    <div className={s.priceRow}>
                        <div className={s.price}>{price} y.e</div>
                        {priceWithoutDiscount ? (
                            <>
                                <div
                                    className={`${s.priceWithoutDiscount} ${s.priceWithoutDiscount_mobile}`}
                                >
                                    {priceWithoutDiscount} y.e
                                </div>
                                <Discount
                                    price={price}
                                    priceWithoutDiscount={priceWithoutDiscount}
                                />
                            </>
                        ) : null}
                    </div>
                    {priceWithoutDiscount ? (
                        <div
                            className={`${s.priceWithoutDiscount} ${s.priceWithoutDiscount_desktop}`}
                        >
                            {priceWithoutDiscount} y.e
                        </div>
                    ) : null}
                </div>
                <Link href={`/game/${id}`} className={s.link}>
                    <div className={s.link__btn}>
                        <ButtonDefault fontSize='md' height='lg'>
                            Learn more
                        </ButtonDefault>
                    </div>
                    <div className={s.link__text}>Learn more</div>
                </Link>
            </div>
        </div>
    )
}
