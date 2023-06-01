/*
  Warnings:

  - You are about to drop the column `ProductRecommendedId` on the `ProductSystemRequirements` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_productSystemRequirementsMinimalId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_productSystemRequirementsRecommendedId_fkey";

-- DropIndex
DROP INDEX "ProductSystemRequirements_ProductRecommendedId_key";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "productSystemRequirementsMinimalId" DROP NOT NULL,
ALTER COLUMN "productSystemRequirementsRecommendedId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductSystemRequirements" DROP COLUMN "ProductRecommendedId";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productSystemRequirementsMinimalId_fkey" FOREIGN KEY ("productSystemRequirementsMinimalId") REFERENCES "ProductSystemRequirements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productSystemRequirementsRecommendedId_fkey" FOREIGN KEY ("productSystemRequirementsRecommendedId") REFERENCES "ProductSystemRequirements"("id") ON DELETE SET NULL ON UPDATE CASCADE;
