-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "mainPageProductsGroupId" TEXT;

-- CreateTable
CREATE TABLE "MainPageProducts" (
    "id" TEXT NOT NULL,

    CONSTRAINT "MainPageProducts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MainPageProducts_id_key" ON "MainPageProducts"("id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_mainPageProductsGroupId_fkey" FOREIGN KEY ("mainPageProductsGroupId") REFERENCES "MainPageProducts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
