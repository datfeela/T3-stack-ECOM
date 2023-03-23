import { z } from 'zod'
import { prisma } from '~/server/db'
import { protectedProcedure } from '../trpc'

export const getUserWishes = protectedProcedure.input(z.string()).query(async ({ input }) => {
    try {
        return await prisma.user.findUnique({
            where: {
                id: input,
            },
            select: {
                wishedProducts: true,
            },
        })
    } catch (e) {
        console.log(`ERROR! can't get categories!`, e)
        throw e
    }
})
