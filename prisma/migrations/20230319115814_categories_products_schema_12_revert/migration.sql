/*
  Warnings:

  - You are about to drop the column `popularity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `ratedByCount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `Product` table. All the data in the column will be lost.

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
    "coverImagePath" TEXT,
    "verticalOrientImagePath" TEXT,
    "miniatureImagePath" TEXT
);
INSERT INTO "new_Product" ("coverImagePath", "desc", "id", "miniatureImagePath", "name", "price", "priceWithoutDiscount", "verticalOrientImagePath", "ytTrailerPath") SELECT "coverImagePath", "desc", "id", "miniatureImagePath", "name", "price", "priceWithoutDiscount", "verticalOrientImagePath", "ytTrailerPath" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
