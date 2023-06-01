-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryFilter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CategoryFilter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryFilterOption" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryFilterId" TEXT,

    CONSTRAINT "CategoryFilterOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "priceWithoutDiscount" INTEGER,
    "productType" TEXT NOT NULL DEFAULT 'game',
    "desc" TEXT,
    "quantityInStock" INTEGER NOT NULL DEFAULT 0,
    "releaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCharacteristic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "ProductCharacteristic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductFilter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductFilter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductFilterValue" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "productFilterId" TEXT,

    CONSTRAINT "ProductFilterValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductReview" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "message" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" TEXT,
    "userId" TEXT,

    CONSTRAINT "ProductReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductSystemRequirements" (
    "id" TEXT NOT NULL,
    "operatingSystem" TEXT NOT NULL,
    "cpu" TEXT NOT NULL,
    "gpu" TEXT NOT NULL,
    "memory" TEXT NOT NULL,
    "freeSpace" TEXT NOT NULL,
    "soundHardware" TEXT,
    "ProductRecommendedId" TEXT,

    CONSTRAINT "ProductSystemRequirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImagePath" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "ProductImagePath_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryFilterToProductCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToProductCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToProductFilter" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_id_key" ON "ProductCategory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_name_key" ON "ProductCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryFilter_id_key" ON "CategoryFilter"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryFilter_name_key" ON "CategoryFilter"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryFilterOption_id_key" ON "CategoryFilterOption"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_productSystemRequirementsMinimalId_key" ON "Product"("productSystemRequirementsMinimalId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_productSystemRequirementsRecommendedId_key" ON "Product"("productSystemRequirementsRecommendedId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCharacteristic_id_key" ON "ProductCharacteristic"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductFilter_id_key" ON "ProductFilter"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductFilterValue_id_key" ON "ProductFilterValue"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductReview_id_key" ON "ProductReview"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductSystemRequirements_id_key" ON "ProductSystemRequirements"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductSystemRequirements_ProductRecommendedId_key" ON "ProductSystemRequirements"("ProductRecommendedId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductImagePath_id_key" ON "ProductImagePath"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryFilterToProductCategory_AB_unique" ON "_CategoryFilterToProductCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryFilterToProductCategory_B_index" ON "_CategoryFilterToProductCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToProductCategory_AB_unique" ON "_ProductToProductCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToProductCategory_B_index" ON "_ProductToProductCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToProductFilter_AB_unique" ON "_ProductToProductFilter"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToProductFilter_B_index" ON "_ProductToProductFilter"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToUser_AB_unique" ON "_ProductToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToUser_B_index" ON "_ProductToUser"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryFilterOption" ADD CONSTRAINT "CategoryFilterOption_categoryFilterId_fkey" FOREIGN KEY ("categoryFilterId") REFERENCES "CategoryFilter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_originalGameId_fkey" FOREIGN KEY ("originalGameId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productSystemRequirementsMinimalId_fkey" FOREIGN KEY ("productSystemRequirementsMinimalId") REFERENCES "ProductSystemRequirements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productSystemRequirementsRecommendedId_fkey" FOREIGN KEY ("productSystemRequirementsRecommendedId") REFERENCES "ProductSystemRequirements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCharacteristic" ADD CONSTRAINT "ProductCharacteristic_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductFilterValue" ADD CONSTRAINT "ProductFilterValue_productFilterId_fkey" FOREIGN KEY ("productFilterId") REFERENCES "ProductFilter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImagePath" ADD CONSTRAINT "ProductImagePath_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryFilterToProductCategory" ADD CONSTRAINT "_CategoryFilterToProductCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "CategoryFilter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryFilterToProductCategory" ADD CONSTRAINT "_CategoryFilterToProductCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductCategory" ADD CONSTRAINT "_ProductToProductCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductCategory" ADD CONSTRAINT "_ProductToProductCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductFilter" ADD CONSTRAINT "_ProductToProductFilter_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductFilter" ADD CONSTRAINT "_ProductToProductFilter_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductFilter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToUser" ADD CONSTRAINT "_ProductToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToUser" ADD CONSTRAINT "_ProductToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
