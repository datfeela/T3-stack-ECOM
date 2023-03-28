/*
  Warnings:

  - You are about to drop the `ProductRelatedProductId` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "ProductRelatedProductId_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProductRelatedProductId";
PRAGMA foreign_keys=on;

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
    "ytTrailerPath" TEXT NOT NULL DEFAULT 'http://www.youtube.com/embed/',
    "ytGameplayTrailerPath" TEXT,
    "coverImagePath" TEXT,
    "verticalImagePath" TEXT,
    "horizontalImagePath" TEXT,
    "originalGameId" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "ratedByCount" INTEGER NOT NULL DEFAULT 0,
    "popularity" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Product_originalGameId_fkey" FOREIGN KEY ("originalGameId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("coverImagePath", "desc", "horizontalImagePath", "id", "name", "popularity", "price", "priceWithoutDiscount", "quantityInStock", "ratedByCount", "rating", "releaseDate", "verticalImagePath", "ytGameplayTrailerPath", "ytTrailerPath") SELECT "coverImagePath", "desc", "horizontalImagePath", "id", "name", "popularity", "price", "priceWithoutDiscount", "quantityInStock", "ratedByCount", "rating", "releaseDate", "verticalImagePath", "ytGameplayTrailerPath", "ytTrailerPath" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
