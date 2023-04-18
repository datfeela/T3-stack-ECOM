import { ProductSystemRequirements } from '@prisma/client'

export const mapSystemReqFromApi = (systemReq: ProductSystemRequirements) => {
    const { id, ProductRecommendedId, ...systemReqWithoutIds } = systemReq

    return systemReqWithoutIds
}
