-- AlterTable
ALTER TABLE "Product" ADD COLUMN "strengthenedUntil" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Product_strengthenedUntil_idx" ON "Product"("strengthenedUntil");
