import type { z } from 'zod'
import type { orderStatusEnum } from '~/modules/shared/lib/validationSchemas'

export type OrderStatus = z.infer<typeof orderStatusEnum>
