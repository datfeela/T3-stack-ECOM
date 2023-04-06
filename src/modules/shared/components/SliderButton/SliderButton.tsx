import { SvgSelector } from '../SvgSelector/SvgSelector'
import s from './SliderButton.module.scss'

export interface SliderButtonProps {
    type: 'prev' | 'next'
    ClName: string | undefined
}

export const SliderButton = ({ type, ClName }: SliderButtonProps) => {
    return (
        <button className={`${ClName} ${s.btn} ${type === 'prev' ? s.btn_prev : ''}`}>
            <SvgSelector id='arrowDefault' />
        </button>
    )
}
