/*
  Warnings:

  - You are about to drop the `ProductRelatedProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProductRelatedProduct";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ProductRelatedProductId" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "productId" TEXT,
    CONSTRAINT "ProductRelatedProductId_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductRelatedProductId_id_key" ON "ProductRelatedProductId"("id");
