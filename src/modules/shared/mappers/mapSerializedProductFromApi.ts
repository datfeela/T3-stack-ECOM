export function mapSerializedProductFromApi<Product>(
    product: Product & { releaseDate: string },
): Omit<Product, 'releaseDate'> & { releaseDate: Date } {
    return {
        ...product,
        releaseDate: new Date(JSON.parse(product.releaseDate) as string),
    }
}
