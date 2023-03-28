-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductSystemRequirements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "operatingSystem" TEXT NOT NULL,
    "cpu" TEXT NOT NULL,
    "gpu" TEXT NOT NULL,
    "memory" TEXT NOT NULL,
    "freeSpace" TEXT NOT NULL,
    "soundHardware" TEXT,
    "productMinimalId" TEXT,
    "ProductRecommendedId" TEXT,
    CONSTRAINT "ProductSystemRequirements_productMinimalId_fkey" FOREIGN KEY ("productMinimalId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ProductSystemRequirements_ProductRecommendedId_fkey" FOREIGN KEY ("ProductRecommendedId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProductSystemRequirements" ("ProductRecommendedId", "cpu", "freeSpace", "gpu", "id", "memory", "operatingSystem", "productMinimalId", "soundHardware") SELECT "ProductRecommendedId", "cpu", "freeSpace", "gpu", "id", "memory", "operatingSystem", "productMinimalId", "soundHardware" FROM "ProductSystemRequirements";
DROP TABLE "ProductSystemRequirements";
ALTER TABLE "new_ProductSystemRequirements" RENAME TO "ProductSystemRequirements";
CREATE UNIQUE INDEX "ProductSystemRequirements_id_key" ON "ProductSystemRequirements"("id");
CREATE UNIQUE INDEX "ProductSystemRequirements_productMinimalId_key" ON "ProductSystemRequirements"("productMinimalId");
CREATE UNIQUE INDEX "ProductSystemRequirements_ProductRecommendedId_key" ON "ProductSystemRequirements"("ProductRecommendedId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
