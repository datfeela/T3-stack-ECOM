import Link from 'next/link'
import { Discount } from '../../../Discount/Discount'
import s from '../../ProductCard.module.scss'
import { SvgSelector } from '../../../SvgSelector/SvgSelector'

interface PopupProps {
    name: string
    desc?: string | null
    href?: string
    categories?: string[]
    price: number
    priceWithoutDiscount: number | null
    deactivatePopup: () => void
}

export const Popup = ({
    name,
    desc,
    href,
    categories,
    price,
    priceWithoutDiscount,
    deactivatePopup,
}: PopupProps) => {
    return (
        <div className={s.popup}>
            {href ? (
                <Link href={href} className={s.name}>
                    {name}
                </Link>
            ) : (
                <div className={s.name}>{name}</div>
            )}
            <div>
                <div className={s.desc}>{desc}</div>
                {categories ? (
                    <div className={s.categories}>
                        {categories.map((name, id) => {
                            if (id > 1) return null
                            return (
                                <div className={s.categories__item} key={id}>
                                    {name}
                                </div>
                            )
                        })}
                    </div>
                ) : null}
            </div>
            <div className={s.priceRow}>
                <div className={s.priceBlock}>
                    <div className={s.priceBlockInner}>
                        <div className={s.price}>{price} y.e</div>
                        {priceWithoutDiscount ? (
                            <div className={s.priceWithoutDiscount}>{priceWithoutDiscount} y.e</div>
                        ) : null}
                    </div>
                    {priceWithoutDiscount ? (
                        <div className={s.discount}>
                            <Discount
                                price={price}
                                priceWithoutDiscount={priceWithoutDiscount}
                                size={'xs'}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
            {href ? (
                <Link href={href} className={s.toProductBtn}>
                    <SvgSelector id='arrowDefault' />
                </Link>
            ) : null}
            <div className={s.popup__closeBtn} onClick={deactivatePopup}>
                <SvgSelector id='close' />
            </div>
        </div>
    )
}
