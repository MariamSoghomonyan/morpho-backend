/*
  Warnings:

  - You are about to drop the `designPortfolios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "designPortfolios";

-- CreateTable
CREATE TABLE "DesignPortfolio" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "designBtn" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DesignPortfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DesignPortfolioItem" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "portfolioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DesignPortfolioItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DesignPortfolioItem" ADD CONSTRAINT "DesignPortfolioItem_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "DesignPortfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
