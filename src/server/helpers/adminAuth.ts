import { jwtVerify } from 'jose'
import { env } from '~/env.mjs'

export const getJwtSecretKey = () => {
    const secret = env.JWT_SECRET_KEY

    if (!secret || secret.length === 0) {
        throw new Error('Env secret key is not set!')
    }

    return secret
}

export const verifyAdmin = async (token: string) => {
    try {
        const verifiedToken = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()))
        return verifiedToken.payload
    } catch (e) {
        throw new Error('Your token has expired!')
    }
}
