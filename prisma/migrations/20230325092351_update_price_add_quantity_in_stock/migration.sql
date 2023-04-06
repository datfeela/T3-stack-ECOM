/*
  Warnings:

  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `priceWithoutDiscount` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "priceWithoutDiscount" INTEGER,
    "quantityInStock" INTEGER NOT NULL DEFAULT 0,
    "releaseDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "ratedByCount" INTEGER NOT NULL DEFAULT 0,
    "popularity" INTEGER NOT NULL DEFAULT 0,
    "desc" TEXT,
    "ytTrailerPath" TEXT,
    "coverImagePath" TEXT,
    "verticalOrientImagePath" TEXT,
    "miniatureImagePath" TEXT
);
INSERT INTO "new_Product" ("coverImagePath", "desc", "id", "miniatureImagePath", "name", "popularity", "price", "priceWithoutDiscount", "ratedByCount", "rating", "releaseDate", "verticalOrientImagePath", "ytTrailerPath") SELECT "coverImagePath", "desc", "id", "miniatureImagePath", "name", "popularity", "price", "priceWithoutDiscount", "ratedByCount", "rating", "releaseDate", "verticalOrientImagePath", "ytTrailerPath" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
