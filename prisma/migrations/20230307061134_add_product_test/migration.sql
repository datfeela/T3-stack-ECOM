/*
  Warnings:

  - You are about to drop the `ProductCategoryFilter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `imagePath` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `ProductCharacteristic` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ProductCategoryFilter_name_key";

-- DropIndex
DROP INDEX "ProductCategoryFilter_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProductCategoryFilter";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ProductFilter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProductImagePath" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "productId" TEXT,
    CONSTRAINT "ProductImagePath_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProductCategoryToProductFilter" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ProductCategoryToProductFilter_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductCategoryToProductFilter_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductFilter" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProductToProductFilter" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ProductToProductFilter_A_fkey" FOREIGN KEY ("A") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductToProductFilter_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductFilter" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "priceWithDiscount" TEXT,
    "desc" TEXT,
    "ytTrailerPath" TEXT,
    "coverImagePath" TEXT
);
INSERT INTO "new_Product" ("desc", "id", "name", "price") SELECT "desc", "id", "name", "price" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");
CREATE UNIQUE INDEX "Product_coverImagePath_key" ON "Product"("coverImagePath");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "ProductFilter_id_key" ON "ProductFilter"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductFilter_name_key" ON "ProductFilter"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductImagePath_id_key" ON "ProductImagePath"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductImagePath_value_key" ON "ProductImagePath"("value");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductCategoryToProductFilter_AB_unique" ON "_ProductCategoryToProductFilter"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductCategoryToProductFilter_B_index" ON "_ProductCategoryToProductFilter"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToProductFilter_AB_unique" ON "_ProductToProductFilter"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToProductFilter_B_index" ON "_ProductToProductFilter"("B");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCharacteristic_id_key" ON "ProductCharacteristic"("id");
