/*
  Warnings:

  - You are about to drop the column `order` on the `designCategoryItems` table. All the data in the column will be lost.
  - Made the column `designBtn` on table `DesignPortfolio` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "DesignPortfolio" ALTER COLUMN "designBtn" SET NOT NULL;

-- AlterTable
ALTER TABLE "designCategoryItems" DROP COLUMN "order";
