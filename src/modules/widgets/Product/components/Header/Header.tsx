import Image from 'next/image'
import { ImageFill } from '~/modules/shared/components/Image/Image'
import { Video } from '~/modules/shared/components/Video/Video'
import type { ProductFiltersClient } from '~/modules/shared/types/productTypes'
import { Slider } from '../Slider/Slider'
import s from './Header.module.scss'

export interface HeaderProps {
    title: string
    price: number
    priceWithoutDiscount: number | undefined | null
    ytTrailerPath: string
    ytGameplayTrailerPath: string | undefined | null
    coverImagePath: string | undefined | null
    detailImages: string[]
    categories: string[]
    releaseDate: Date
    filters: Omit<ProductFiltersClient, 'tags'>
}

export const Header = ({
    title,
    price,
    priceWithoutDiscount,
    ytTrailerPath,
    ytGameplayTrailerPath,
    coverImagePath,
    detailImages,
    categories,
    releaseDate,
    filters,
}: HeaderProps) => {
    const videosSrc: string[] = []
    ytTrailerPath && videosSrc.push(ytTrailerPath)
    ytGameplayTrailerPath && videosSrc.push(ytGameplayTrailerPath)

    return (
        <div className={s.wrap}>
            <div className={s.content + ' wrap'}>
                <Slider imagesSrc={detailImages} videosSrc={videosSrc} />
                <div>
                    <h1>{title}</h1>
                </div>
            </div>
        </div>
    )
}
