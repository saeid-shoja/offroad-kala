-- AlterEnum
ALTER TYPE "CategoryGroup" ADD VALUE 'CAR_BRAND';

-- AlterTable: Category
ALTER TABLE "Category" ADD COLUMN "brandCode" TEXT;
CREATE UNIQUE INDEX "Category_brandCode_key" ON "Category"("brandCode");

-- AlterTable: ProductCarBrand (enum brand -> text brandCode)
ALTER TABLE "ProductCarBrand" RENAME COLUMN "brand" TO "brandCode";
ALTER TABLE "ProductCarBrand" ALTER COLUMN "brandCode" TYPE TEXT USING "brandCode"::TEXT;

-- DropEnum
DROP TYPE "CarBrand";
