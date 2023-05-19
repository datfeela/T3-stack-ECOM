import type { z } from 'zod'
import type { adminLoginSchema } from './lib/validationSchemas'

export type AdminInput = z.infer<typeof adminLoginSchema>
