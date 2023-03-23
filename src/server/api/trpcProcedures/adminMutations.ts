import { TRPCError } from '@trpc/server'
import { SignJWT } from 'jose'
import { nanoid } from 'nanoid'
import { env } from '~/env.mjs'
import { getJwtSecretKey } from '~/server/helpers/adminAuth'
import cookie from 'cookie'
import { adminLoginSchema } from '~/modules/entities/admin'
import { publicProcedure } from '../trpc'

export const adminLogIn = publicProcedure
    .input(adminLoginSchema)
    .mutation(async ({ ctx, input }) => {
        const { login, password, rememberMe } = input
        const { res } = ctx

        const envLogin = env.ADMIN_LOGIN
        const envPassWord = env.ADMIN_PASSWORD

        if (!envLogin || envLogin.length === 0 || !envPassWord || envPassWord.length === 0) {
            throw new TRPCError({
                message: 'there is no login/password set for admin!',
                code: 'NOT_FOUND',
            })
        }

        if (envLogin !== login || envPassWord !== password) {
            throw new TRPCError({
                message: 'wrong login/password!',
                code: 'NOT_FOUND',
            })
        }

        // if login an password are valid

        const token = await new SignJWT({})
            .setProtectedHeader({ alg: 'HS256' })
            .setJti(nanoid())
            .setIssuedAt()
            .setExpirationTime(
                rememberMe ? (env.NODE_ENV === 'production' ? '1d' : '14 days') : '1h',
            ) //see "vercel/ms"
            .sign(new TextEncoder().encode(getJwtSecretKey()))

        // so the cookie can be sent back and revalidated in middleware

        res.setHeader(
            'Set-Cookie',
            cookie.serialize('admin-token', token, {
                // httpOnly: true, //!turning this off is a bit wrong btw
                path: '/',
                secure: env.NODE_ENV === 'production',
                sameSite: env.NODE_ENV === 'production' && 'lax',
            }),
        )

        return { success: true }
    })
