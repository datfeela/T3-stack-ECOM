/*
  Warnings:

  - You are about to drop the column `mainPageProductsGroupId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `MainPageProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_mainPageProductsGroupId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "mainPageProductsGroupId";

-- DropTable
DROP TABLE "MainPageProducts";

-- CreateTable
CREATE TABLE "MainPageProduct" (
    "id" TEXT NOT NULL,
    "productId" TEXT,
    "sortNum" INTEGER NOT NULL,

    CONSTRAINT "MainPageProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MainPageProduct_id_key" ON "MainPageProduct"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MainPageProduct_productId_key" ON "MainPageProduct"("productId");

-- AddForeignKey
ALTER TABLE "MainPageProduct" ADD CONSTRAINT "MainPageProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
