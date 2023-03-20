/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "ProductCharacteristics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    CONSTRAINT "ProductCharacteristics_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductCharacteristic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "productCharacteristicsId" TEXT,
    CONSTRAINT "ProductCharacteristic_productCharacteristicsId_fkey" FOREIGN KEY ("productCharacteristicsId") REFERENCES "ProductCharacteristics" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductCharacteristics_productId_key" ON "ProductCharacteristics"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");
