import { z } from 'zod'

// image
const mByte = 1024 * 1024
const maxFileSize = 4 * mByte
const acceptedMimeTypes = ['image/webp', 'image/jpeg', 'image/png']

export const validateImage = (img: File | undefined, ctx: z.RefinementCtx) => {
    if (!img) return

    if (!acceptedMimeTypes.includes(img.type)) {
        ctx.addIssue({
            code: 'custom',
            message: `File must be one of [${acceptedMimeTypes.join(', ')}] but was ${img.type}`,
        })
    }
    if (img.size > 4 * maxFileSize) {
        ctx.addIssue({
            code: 'custom',
            message: `The file must not be larger than 4 mbytes, but is larger than ${Math.floor(
                img.size / mByte,
            )}mbytes`,
        })
    }
    return
}

// product

export const filterNameEnum = z.nativeEnum({
    gamemodes: 'gamemodes',
    tags: 'tags',
    platforms: 'platforms',
    publisher: 'publisher',
    features: 'features',
} as const)

export const filtersSchema = z.array(
    z.object({
        name: filterNameEnum,
        values: z.array(z.string()),
    }),
)

export const formikFiltersSchema = z.object({
    gamemodes: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    platforms: z.array(z.string()).optional(),
    publisher: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
})

const addProductSharedFields = z.object({
    name: z.string(),
    price: z.string(),
    priceWithoutDiscount: z.string().nullable().optional(),
    desc: z.string().optional().nullable(),
    ytTrailerPath: z.string().nullable().optional(),
    categories: z.array(z.string()).optional(),
    characteristics: z
        .array(
            z.object({
                name: z.string(),
                value: z.string(),
            }),
        )
        .optional(),
})

export const formikAddProductValidationSchema = addProductSharedFields.extend({
    coverImage: z.any().superRefine((val, ctx) => {
        validateImage(val as File | undefined, ctx)
    }),
    verticalOrientImage: z.any().superRefine((val, ctx) => {
        validateImage(val as File | undefined, ctx)
    }),
    miniatureImage: z.any().superRefine((val, ctx) => {
        validateImage(val as File | undefined, ctx)
    }),
    filters: formikFiltersSchema.optional(),
    releaseDate: z.string(),
    // releaseDate: z.object({
    //     year: z.number(),
    //     month: z.number(),
    //     day: z.number(),
    // }),
})

export const addProductValidationSchema = addProductSharedFields.extend({
    coverImagePath: z.string().optional(),
    verticalOrientImagePath: z.string().optional(),
    miniatureImagePath: z.string().optional(),
    filters: filtersSchema.optional(),
    releaseDate: z.date(),
    // imagesPaths: z.string().optional(),
})

export const editProductValidationSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    desc: z.string().nullable().optional(),
    price: z.string().optional(),
    releaseDate: z.date().optional(),
    priceWithoutDiscount: z.string().nullable().optional(),
    ytTrailerPath: z.string().nullable().optional(),
    categories: z.array(z.string()).optional(),
    characteristics: z
        .array(
            z.object({
                name: z.string(),
                value: z.string(),
            }),
        )
        .optional(),
    coverImagePath: z.string().optional(),
    verticalOrientImagePath: z.string().optional(),
    miniatureImagePath: z.string().optional(),
    filters: filtersSchema.optional(),
})

// product sort

export const NamesToSortProductsEnum = z.nativeEnum({
    price: 'price',
    name: 'name',
} as const)

export const ValuesToSortProductsEnum = z.nativeEnum({
    asc: 'asc',
    desc: 'desc',
} as const)

export const sortProductsSchema = z.object({
    name: NamesToSortProductsEnum,
    value: ValuesToSortProductsEnum,
})
