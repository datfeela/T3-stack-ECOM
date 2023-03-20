/*
  Warnings:

  - You are about to drop the column `priceWithDiscount` on the `Product` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "priceWithoutDiscount" TEXT,
    "desc" TEXT,
    "ytTrailerPath" TEXT,
    "coverImagePath" TEXT
);
INSERT INTO "new_Product" ("coverImagePath", "desc", "id", "name", "price", "ytTrailerPath") SELECT "coverImagePath", "desc", "id", "name", "price", "ytTrailerPath" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
