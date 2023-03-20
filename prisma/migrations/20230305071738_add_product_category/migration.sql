/*
  Warnings:

  - You are about to drop the `ProductCharacteristics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `productCharacteristicsId` on the `ProductCharacteristic` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ProductCharacteristics_productId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProductCharacteristics";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ProductCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "desc" TEXT,
    "imagePath" TEXT,
    "categoryId" TEXT,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProductCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("desc", "id", "imagePath", "name", "price") SELECT "desc", "id", "imagePath", "name", "price" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");
CREATE TABLE "new_ProductCharacteristic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "productId" TEXT,
    CONSTRAINT "ProductCharacteristic_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProductCharacteristic" ("id", "name", "value") SELECT "id", "name", "value" FROM "ProductCharacteristic";
DROP TABLE "ProductCharacteristic";
ALTER TABLE "new_ProductCharacteristic" RENAME TO "ProductCharacteristic";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_id_key" ON "ProductCategory"("id");
