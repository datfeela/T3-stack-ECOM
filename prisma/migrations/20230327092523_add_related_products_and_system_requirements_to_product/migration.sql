-- CreateTable
CREATE TABLE "ProductSystemRequirements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "operatingSystem" TEXT NOT NULL,
    "cpu" TEXT NOT NULL,
    "gpu" TEXT NOT NULL,
    "memory" TEXT NOT NULL,
    "freeSpace" TEXT NOT NULL,
    "soundHardware" TEXT NOT NULL,
    "productId" TEXT,
    CONSTRAINT "ProductSystemRequirements_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductRelatedProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "productId" TEXT,
    CONSTRAINT "ProductRelatedProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductSystemRequirements_id_key" ON "ProductSystemRequirements"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductSystemRequirements_productId_key" ON "ProductSystemRequirements"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductRelatedProduct_id_key" ON "ProductRelatedProduct"("id");
