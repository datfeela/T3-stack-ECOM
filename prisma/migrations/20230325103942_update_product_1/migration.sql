/*
  Warnings:

  - You are about to drop the column `miniatureImagePath` on the `Product` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "ProductImagePath" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "productId" TEXT,
    CONSTRAINT "ProductImagePath_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "priceWithoutDiscount" INTEGER,
    "desc" TEXT,
    "quantityInStock" INTEGER NOT NULL DEFAULT 0,
    "releaseDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "ratedByCount" INTEGER NOT NULL DEFAULT 0,
    "popularity" INTEGER NOT NULL DEFAULT 0,
    "ytTrailerPath" TEXT NOT NULL DEFAULT 'http://www.youtube.com/embed/',
    "ytGameplayTrailerPath" TEXT,
    "coverImagePath" TEXT,
    "verticalOrientImagePath" TEXT,
    "horizontalImagePath" TEXT
);
INSERT INTO "new_Product" ("coverImagePath", "desc", "id", "name", "popularity", "price", "priceWithoutDiscount", "quantityInStock", "ratedByCount", "rating", "releaseDate", "verticalOrientImagePath", "ytTrailerPath") SELECT "coverImagePath", "desc", "id", "name", "popularity", "price", "priceWithoutDiscount", "quantityInStock", "ratedByCount", "rating", "releaseDate", "verticalOrientImagePath", coalesce("ytTrailerPath", 'http://www.youtube.com/embed/') AS "ytTrailerPath" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "ProductImagePath_id_key" ON "ProductImagePath"("id");
