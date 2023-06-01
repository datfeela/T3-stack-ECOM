import { env } from '~/env.mjs'
import { createJwtSecretKey, validateAdminCredentials } from '~/server/helpers/adminAuth'
import cookie from 'cookie'
import { adminLoginSchema } from '~/modules/entities/admin'
import { publicProcedure } from '../trpc'

export const adminLogIn = publicProcedure
    .input(adminLoginSchema)
    .mutation(async ({ ctx, input }) => {
        const { login, password, rememberMe } = input
        const { res } = ctx

        validateAdminCredentials({ login, password })

        // if valid credentials
        const token = await createJwtSecretKey(rememberMe)

        // now cookie can be sent back and revalidated in middleware
        res.setHeader(
            'Set-Cookie',
            cookie.serialize('admin-token', token, {
                // httpOnly: true, //!turning this off is a bit wrong btw, but idk how to play around it on client
                path: '/',
                secure: env.NODE_ENV === 'production',
                sameSite: env.NODE_ENV === 'production' && 'lax',
            }),
        )

        return { success: true }
    })
