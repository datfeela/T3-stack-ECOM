/*
  Warnings:

  - You are about to drop the column `productCategoryId` on the `CategoryFilter` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_CategoryFilterToProductCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CategoryFilterToProductCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "CategoryFilter" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CategoryFilterToProductCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CategoryFilter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_CategoryFilter" ("id", "name") SELECT "id", "name" FROM "CategoryFilter";
DROP TABLE "CategoryFilter";
ALTER TABLE "new_CategoryFilter" RENAME TO "CategoryFilter";
CREATE UNIQUE INDEX "CategoryFilter_id_key" ON "CategoryFilter"("id");
CREATE UNIQUE INDEX "CategoryFilter_name_key" ON "CategoryFilter"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryFilterToProductCategory_AB_unique" ON "_CategoryFilterToProductCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryFilterToProductCategory_B_index" ON "_CategoryFilterToProductCategory"("B");
