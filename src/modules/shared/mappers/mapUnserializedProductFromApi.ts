export function mapUnserializedProductFromApi<Product>(
    product: Product & { releaseDate: Date },
): Omit<Product, 'releaseDate'> & { releaseDate: string } {
    return {
        ...product,
        releaseDate: JSON.stringify(product.releaseDate),
    }
}
