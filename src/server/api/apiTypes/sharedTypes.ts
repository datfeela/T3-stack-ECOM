import type { createInnerTRPCContext } from '../trpc'

export type TRPCContext = ReturnType<typeof createInnerTRPCContext>
