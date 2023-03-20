import type { z } from 'zod'
import { adminLoginSchema } from './lib/validationSchemas'

export type AdminInput = z.infer<typeof adminLoginSchema>
