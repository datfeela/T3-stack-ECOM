/*
  Warnings:

  - You are about to drop the column `ratedByCount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Product` table. All the data in the column will be lost.

*/
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
    "productSystemRequirementsMinimalId" TEXT NOT NULL,
    "productSystemRequirementsRecommendedId" TEXT NOT NULL,
    "positiveScoresCount" INTEGER NOT NULL DEFAULT 0,
    "negativeScoresCount" INTEGER NOT NULL DEFAULT 0,
    "popularity" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Product_originalGameId_fkey" FOREIGN KEY ("originalGameId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_productSystemRequirementsMinimalId_fkey" FOREIGN KEY ("productSystemRequirementsMinimalId") REFERENCES "ProductSystemRequirements" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_productSystemRequirementsRecommendedId_fkey" FOREIGN KEY ("productSystemRequirementsRecommendedId") REFERENCES "ProductSystemRequirements" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("coverImagePath", "desc", "horizontalImagePath", "id", "name", "originalGameId", "popularity", "price", "priceWithoutDiscount", "productSystemRequirementsMinimalId", "productSystemRequirementsRecommendedId", "quantityInStock", "releaseDate", "verticalImagePath", "ytGameplayTrailerPath", "ytTrailerPath") SELECT "coverImagePath", "desc", "horizontalImagePath", "id", "name", "originalGameId", "popularity", "price", "priceWithoutDiscount", "productSystemRequirementsMinimalId", "productSystemRequirementsRecommendedId", "quantityInStock", "releaseDate", "verticalImagePath", "ytGameplayTrailerPath", "ytTrailerPath" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");
CREATE UNIQUE INDEX "Product_productSystemRequirementsMinimalId_key" ON "Product"("productSystemRequirementsMinimalId");
CREATE UNIQUE INDEX "Product_productSystemRequirementsRecommendedId_key" ON "Product"("productSystemRequirementsRecommendedId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
