import { ImageFill } from '~/modules/shared/components/Image/Image'
import type { Properties as TProperties } from '../../types/types'
import { Properties } from '../Properties/Properties'
import { Slider } from '../Slider/Slider'
import s from './Header.module.scss'
export interface HeaderProps {
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
                {/* TODO: !PLACEHOLDER BG */}
            </div>
            <div className={s.content + ' wrap'}>
                <Slider
                    imagesSrc={detailImages}
                    videosSrc={videosSrc}
                    horizontalImage={horizontalImagePath}
                />
                <div>
                    <div className={s.wrap}>
                        <h1 className={s.title}>{title}</h1>
                        <div className={s.priceBlock}></div>
                        {/* {price && priceWithoutDiscount ? <Discount /> : <div/>} */}
                    </div>
                </div>
            </div>
        </div>
    )
}
