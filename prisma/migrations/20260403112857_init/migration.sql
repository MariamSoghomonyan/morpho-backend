/*
  Warnings:

  - You are about to drop the `designPortfolioItems` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `items` to the `designPortfolios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "designPortfolioItems" DROP CONSTRAINT "designPortfolioItems_portfolioId_fkey";

-- AlterTable
ALTER TABLE "designPortfolios" ADD COLUMN     "items" JSONB NOT NULL;

-- DropTable
DROP TABLE "designPortfolioItems";
