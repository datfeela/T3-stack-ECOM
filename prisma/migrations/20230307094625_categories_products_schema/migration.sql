/*
  Warnings:

  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductCategoryToProductFilter` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `ProductCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ProductFilter_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Example";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ProductCategoryToProductFilter";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "CategoryFilter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "productCategoryId" TEXT,
    CONSTRAINT "CategoryFilter_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "ProductCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CategoryFilterOption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "categoryFilterId" TEXT,
    CONSTRAINT "CategoryFilterOption_categoryFilterId_fkey" FOREIGN KEY ("categoryFilterId") REFERENCES "CategoryFilter" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductFilterValue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "productFilterId" TEXT,
    CONSTRAINT "ProductFilterValue_productFilterId_fkey" FOREIGN KEY ("productFilterId") REFERENCES "ProductFilter" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoryFilter_id_key" ON "CategoryFilter"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryFilter_name_key" ON "CategoryFilter"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryFilterOption_id_key" ON "CategoryFilterOption"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductFilterValue_id_key" ON "ProductFilterValue"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_name_key" ON "ProductCategory"("name");
