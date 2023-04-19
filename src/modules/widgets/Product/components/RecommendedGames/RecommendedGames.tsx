import Image from '~/modules/shared/components/Image/Image'
import { useRecommendedProducts } from '../../hooks/useRecommendedProducts'
import s from './RecommendedGames.module.scss'

export const RecommendedGames = ({ productId }: { productId: string }) => {
    const products = useRecommendedProducts(productId)

    return (
        <div>
            {products.map(({}, id) => (
                <div key={id}></div>
            ))}
        </div>
    )
}
