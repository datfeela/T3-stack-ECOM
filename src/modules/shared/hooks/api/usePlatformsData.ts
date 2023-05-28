import { api } from '../../api/apiTRPC'
import type { Platform } from '../../types/productTypes'

export const usePlatformsData = () => {
    return [
        { id: 'ps', name: 'ps' },
        { id: 'windows', name: 'windows' },
        { id: 'xbox', name: 'xbox' },
    ] as { id: string; name: Platform }[]
}
