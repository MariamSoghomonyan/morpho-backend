/*
  Warnings:

  - You are about to drop the `HomePageServicesHeading` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "HomePageServicesHeading";

-- CreateTable
CREATE TABLE "HomePageServicesHeadings" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "badge" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomePageServicesHeadings_pkey" PRIMARY KEY ("id")
);
