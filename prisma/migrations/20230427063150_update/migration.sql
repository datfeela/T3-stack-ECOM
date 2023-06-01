/*
  Warnings:

  - Made the column `productId` on table `MainPageProduct` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "MainPageProduct" DROP CONSTRAINT "MainPageProduct_productId_fkey";

-- AlterTable
ALTER TABLE "MainPageProduct" ALTER COLUMN "productId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "MainPageProduct" ADD CONSTRAINT "MainPageProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
