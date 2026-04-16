/*
  Warnings:

  - You are about to drop the column `items` on the `designPortfolios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "designPortfolios" DROP COLUMN "items";

-- CreateTable
CREATE TABLE "designPortfolioItems" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,

    CONSTRAINT "designPortfolioItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "designPortfolioItems" ADD CONSTRAINT "designPortfolioItems_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "designPortfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
