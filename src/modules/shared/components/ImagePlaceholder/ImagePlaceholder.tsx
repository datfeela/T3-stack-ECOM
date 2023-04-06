import Image from 'next/image'
import { env } from '~/env.mjs'
import s from './ImagePlaceholder.module.scss'

export const ImagePlaceholder = () => {
    const imgSrc = env.NEXT_PUBLIC_IMAGES_PATH + 'placeholder.jpg'

    return (
        <div className={s.wrap}>
            <Image src={imgSrc} alt={'placeholder'} fill style={{ objectFit: 'contain' }} />
        </div>
    )
}
