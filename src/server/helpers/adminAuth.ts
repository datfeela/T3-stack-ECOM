import { TRPCError } from '@trpc/server'
import { SignJWT, jwtVerify } from 'jose'
import { nanoid } from 'nanoid'
import { env } from '~/env.mjs'

export const getJwtSecretKey = () => {
    const secret = env.JWT_SECRET_KEY

    if (!secret || secret.length === 0) {
        throw new Error('Env secret key is not set!')
    }

    return secret
}

export const createJwtSecretKey = async (rememberMe: boolean) => {
    const token = await new SignJWT({})
        .setProtectedHeader({ alg: 'HS256' })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime(rememberMe ? (env.NODE_ENV === 'production' ? '1d' : '14 days') : '1h') //see "vercel/ms"
        .sign(new TextEncoder().encode(getJwtSecretKey()))

    return token
}

export const verifyAdmin = async (token: string) => {
    try {
        const verifiedToken = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()))
        return verifiedToken.payload
    } catch (e) {
        throw new Error('Your token has expired!')
    }
}

export const validateAdminCredentials = ({
    login,
    password,
}: {
    login: string
    password: string
}) => {
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
}
