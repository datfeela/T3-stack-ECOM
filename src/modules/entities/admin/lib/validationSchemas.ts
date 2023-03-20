import { z } from 'zod'

// admin valid
const loginSchema = z.string({ required_error: 'login is required' }).min(5).max(30)
const passwordSchema = z.string({ required_error: 'password is required' }).min(8).max(40)

export const adminLoginSchema = z.object({
    login: loginSchema,
    password: passwordSchema,
    rememberMe: z.boolean(),
})
