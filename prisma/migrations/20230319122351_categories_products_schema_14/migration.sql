-- CreateTable
CREATE TABLE "ProductReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rating" INTEGER NOT NULL,
    "message" TEXT,
    "productId" TEXT,
    "userId" TEXT,
    CONSTRAINT "ProductReview_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ProductReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "priceWithoutDiscount" TEXT,
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
INSERT INTO "new_Product" ("coverImagePath", "desc", "id", "miniatureImagePath", "name", "price", "priceWithoutDiscount", "verticalOrientImagePath", "ytTrailerPath") SELECT "coverImagePath", "desc", "id", "miniatureImagePath", "name", "price", "priceWithoutDiscount", "verticalOrientImagePath", "ytTrailerPath" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "ProductReview_id_key" ON "ProductReview"("id");
