/*
  Warnings:

  - You are about to drop the `FooterContacts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "FooterContacts";

-- CreateTable
CREATE TABLE "footerContacts" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "email_label" TEXT NOT NULL,
    "telephone_label" TEXT NOT NULL,
    "address_label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "footerContacts_pkey" PRIMARY KEY ("id")
);
