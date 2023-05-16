import { ProductSystemRequirements } from '@prisma/client'

export const mapSystemReqFromApi = (systemReq: ProductSystemRequirements) => {
    const { id, ...systemReqWithoutIds } = systemReq

    return systemReqWithoutIds
}
