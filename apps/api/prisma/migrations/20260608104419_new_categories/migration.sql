-- DropIndex
DROP INDEX "Product_listedAt_idx";

-- DropIndex
DROP INDEX "Product_status_activeUntil_idx";

-- DropIndex
DROP INDEX "Product_status_deprecatedAt_idx";

-- RenameIndex
ALTER INDEX "ProductCarBrand_brand_idx" RENAME TO "ProductCarBrand_brandCode_idx";
