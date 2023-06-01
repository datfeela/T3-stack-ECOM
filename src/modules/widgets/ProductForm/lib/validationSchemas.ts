import { productType } from '~/modules/shared/lib/validationSchemas'
import { z } from 'zod'
import { clientFiltersSchema, filtersSchema } from '~/modules/shared/lib/validationSchemas'

// image
const mByte = 1024 * 1024
const maxFileSize = 4 * mByte
const acceptedMimeTypes = ['image/webp', 'image/jpeg', 'image/png']

const validateImage = (img: File | string | undefined, ctx: z.RefinementCtx) => {
    if (!img || typeof img === 'string') return

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

// system req
const systemRequirements = z
    .object({
        operatingSystem: z.string(),
        cpu: z.string(),
        gpu: z.string(),
        memory: z.string(),
        freeSpace: z.string(),
        soundHardware: z.string().nullable().optional(),
    })
    .optional()

const addProductSharedFields = z.object({
    name: z.string(),
    desc: z.string().nullable().optional(),
    ytTrailerPath: z.string(),
    ytGameplayTrailerPath: z.string().nullable().optional(),
    categories: z.array(z.string()).optional(),
    characteristics: z
        .array(
            z.object({
                name: z.string(),
                value: z.string(),
            }),
        )
        .optional(),
    originalGameId: z.string().nullable().optional(),
    systemRequirementsMinimal: systemRequirements.nullish(),
    systemRequirementsRecommended: systemRequirements.nullish(),
    productType,
})

export const formikAddProductValidationSchema = addProductSharedFields
    .extend({
        price: z.string(),
        priceWithoutDiscount: z.string().nullable().optional(),
        quantityInStock: z.string(),
        coverImage: z.any().superRefine((val, ctx) => {
            validateImage(val as File | undefined, ctx)
        }),
        verticalImage: z.any().superRefine((val, ctx) => {
            validateImage(val as File | undefined, ctx)
        }),
        horizontalImage: z.any().superRefine((val, ctx) => {
            validateImage(val as File | undefined, ctx)
        }),
        detailPageImages: z.any(),
        filters: clientFiltersSchema.optional(),
        releaseDate: z.string(),
    })
    .superRefine(({ price, priceWithoutDiscount, quantityInStock }, ctx) => {
        Object.entries({
            price,
            priceWithoutDiscount,
            quantityInStock,
        }).forEach(([key, value]) => {
            if (!value) return

            if (Number.isNaN(Number(value))) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: [key],
                    message: `value should be numbers only`,
                })
                return
            }
            if (Number(value) < 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: [key],
                    message: `value can't be less, than 0`,
                })
                return
            }
        })

        if (priceWithoutDiscount && Number(price) >= Number(priceWithoutDiscount)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['priceWithoutDiscount'],
                message: `price without discount can't be less or equal to price with discount`,
            })
            return
        }
    })

export const addProductValidationSchema = addProductSharedFields.extend({
    id: z.string().optional(),
    price: z.number(),
    priceWithoutDiscount: z.number().nullable().optional(),
    quantityInStock: z.number(),
    coverImagePath: z.string().nullable().optional(),
    verticalImagePath: z.string().nullable().optional(),
    horizontalImagePath: z.string().nullable().optional(),
    detailPageImages: z.array(z.object({ value: z.string() })),
    filters: filtersSchema.optional(),
    releaseDate: z.date(),
})

export const editProductValidationSchema = z
    .object({
        id: z.string(),
        name: z.string().optional(),
        desc: z.string().nullable().optional(),
        price: z.number().optional(),
        quantityInStock: z.number().optional(),
        releaseDate: z.date().optional(),
        priceWithoutDiscount: z.number().nullable().optional(),
        ytTrailerPath: z.string().optional(),
        ytGameplayTrailerPath: z.string().nullable().optional(),
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
        verticalImagePath: z.string().optional(),
        horizontalImagePath: z.string().optional(),
        detailPageImages: z
            .array(
                z.object({
                    value: z.string(),
                }),
            )
            .optional(),

        filters: filtersSchema.optional(),
        systemRequirementsMinimal: systemRequirements.nullish(),
        systemRequirementsRecommended: systemRequirements.nullish(),
        originalGameId: z.string().nullable().optional(),
        productType: productType.optional(),
    })
    .superRefine(({ price, priceWithoutDiscount, quantityInStock }, ctx) => {
        Object.entries({
            price,
            priceWithoutDiscount,
            quantityInStock,
        }).forEach(([key, value]) => {
            if (!value) return

            if (Number.isNaN(Number(value))) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: [key],
                    message: `value should be numbers only`,
                })
                return
            }
            if (Number(value) <= 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: [key],
                    message: `value can't be less, than 1`,
                })
                return
            }
        })

        if (priceWithoutDiscount && Number(price) >= Number(priceWithoutDiscount)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['priceWithoutDiscount'],
                message: `price without discount can't be less or equal to price with discount`,
            })
            return
        }
    })
