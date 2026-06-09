-- CreateEnum
CREATE TYPE "LibraryKind" AS ENUM ('PART_TREE', 'CAR_BRANDS');

-- CreateTable
CREATE TABLE "Library" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "kind" "LibraryKind" NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isSystem" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Library_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "Category" ADD COLUMN "isSystem" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "Category" ADD COLUMN "libraryId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Library_slug_key" ON "Library"("slug");
CREATE INDEX "Library_sortOrder_idx" ON "Library"("sortOrder");
CREATE INDEX "Category_libraryId_idx" ON "Category"("libraryId");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE SET NULL ON UPDATE CASCADE;
