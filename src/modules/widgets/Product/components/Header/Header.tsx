import { ImageFill } from '~/modules/shared/components/Image/Image'
import { Slider } from '../Slider/Slider'
import s from './Header.module.scss'
import { Discount } from '~/modules/shared/components/Discount/Discount'
import { ButtonDefault } from '~/modules/shared/components/Button/Button'
import { Favorites } from '~/modules/features/Favorites'
export interface HeaderProps {
    id: string
    title: string
    price: number
    priceWithoutDiscount: number | undefined | null
    ytTrailerPath: string
    ytGameplayTrailerPath: string | undefined | null
    coverImagePath: string | undefined | null
    horizontalImagePath: string | undefined | null
    detailImages: string[]
}

export const Header = ({
    id,
    title,
    price,
    priceWithoutDiscount,
    ytTrailerPath,
    ytGameplayTrailerPath,
    coverImagePath,
    horizontalImagePath,
    detailImages,
}: HeaderProps) => {
    const videosSrc: string[] = []
    ytTrailerPath && videosSrc.push(ytTrailerPath)
    ytGameplayTrailerPath && videosSrc.push(ytGameplayTrailerPath)

    return (
        <div className={s.wrap}>
            <div className={s.bgWrap}>
                <div className={s.bg}>
                    {coverImagePath ? <ImageFill src={coverImagePath} /> : null}
                </div>
                <div className={s.bgShadow}></div>
                {/* TODO: !PLACEHOLDER BG */}
            </div>
            <div className={s.content + ' wrap'}>
                <Slider
                    imagesSrc={detailImages}
                    videosSrc={videosSrc}
                    horizontalImage={horizontalImagePath}
                />
                <div className={s.info}>
                    <h1 className={s.title}>{title}</h1>
                    <div className={s.priceBlock}>
                        <div className={s.priceRow}>
                            <div className={s.price}>{price} y.e</div>
                            {priceWithoutDiscount ? (
                                <>
                                    <div className={`${s.price} ${s.price_discount}`}>
                                        {priceWithoutDiscount} y.e
                                    </div>
                                    <Discount
                                        price={price}
                                        priceWithoutDiscount={priceWithoutDiscount}
                                    />
                                </>
                            ) : (
                                <div />
                            )}
                        </div>
                        <div className={s.buyRow}>
                            <ButtonDefault fontSize='lg'>
                                <span>Buy now</span>
                            </ButtonDefault>
                            <Favorites id={id} withBg={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
