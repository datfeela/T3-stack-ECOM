import type { ProductSystemRequirements } from '@prisma/client'

export const mapSystemReqFromApi = (systemReq: ProductSystemRequirements | null) => {
    if (!systemReq) return null
    const { id, ...systemReqWithoutIds } = systemReq

    return systemReqWithoutIds
}
