-- CreateTable
CREATE TABLE "ProductImagePath" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "productId" TEXT,
    CONSTRAINT "ProductImagePath_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductImagePath_id_key" ON "ProductImagePath"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductImagePath_value_key" ON "ProductImagePath"("value");
