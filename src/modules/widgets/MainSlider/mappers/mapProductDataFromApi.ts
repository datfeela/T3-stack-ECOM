import type { MainPageProductFromApi } from '~/modules/entities/product'

export const mapProductDataFromApi = ({ product }: MainPageProductFromApi) => {
    const {
        id,
        name,
        desc,
        price,
        priceWithoutDiscount,
        releaseDate,
        horizontalImagePath,
        detailPageImages,
    } = product

    return {
        id,
        name,
        desc,
        price,
        priceWithoutDiscount,
        releaseDate,
        imagePath: detailPageImages[0]?.value || horizontalImagePath,
    }
}
