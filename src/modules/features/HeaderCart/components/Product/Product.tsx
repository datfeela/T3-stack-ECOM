import { ProductCard } from '~/modules/shared/components/ProductCard/ProductCard'
import { mapProductData } from '../../lib/mapProductData'
import type { ProductWithQuantity } from '../../types/types'

export const Product = (props: ProductWithQuantity) => {
    const productData = mapProductData(props)

    return <ProductCard {...productData} view='cartHeader' imageSizes='120px' />
}
