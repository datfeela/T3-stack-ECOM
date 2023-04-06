/*
  Warnings:

  - You are about to drop the column `productId` on the `ProductSystemRequirements` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductSystemRequirements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "operatingSystem" TEXT NOT NULL,
    "cpu" TEXT NOT NULL,
    "gpu" TEXT NOT NULL,
    "memory" TEXT NOT NULL,
    "freeSpace" TEXT NOT NULL,
    "soundHardware" TEXT NOT NULL,
    "productMinimalId" TEXT,
    "ProductRecommendedId" TEXT,
    CONSTRAINT "ProductSystemRequirements_productMinimalId_fkey" FOREIGN KEY ("productMinimalId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ProductSystemRequirements_ProductRecommendedId_fkey" FOREIGN KEY ("ProductRecommendedId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProductSystemRequirements" ("cpu", "freeSpace", "gpu", "id", "memory", "operatingSystem", "soundHardware") SELECT "cpu", "freeSpace", "gpu", "id", "memory", "operatingSystem", "soundHardware" FROM "ProductSystemRequirements";
DROP TABLE "ProductSystemRequirements";
ALTER TABLE "new_ProductSystemRequirements" RENAME TO "ProductSystemRequirements";
CREATE UNIQUE INDEX "ProductSystemRequirements_id_key" ON "ProductSystemRequirements"("id");
CREATE UNIQUE INDEX "ProductSystemRequirements_productMinimalId_key" ON "ProductSystemRequirements"("productMinimalId");
CREATE UNIQUE INDEX "ProductSystemRequirements_ProductRecommendedId_key" ON "ProductSystemRequirements"("ProductRecommendedId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
