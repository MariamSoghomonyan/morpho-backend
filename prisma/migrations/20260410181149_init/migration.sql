/*
  Warnings:

  - You are about to drop the `academyPageContacts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "academyPageContacts";

-- CreateTable
CREATE TABLE "AcademyPageContact" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "nameLabel" TEXT NOT NULL,
    "emailLabel" TEXT NOT NULL,
    "phoneLabel" TEXT NOT NULL,
    "courseLabel" TEXT NOT NULL,
    "messageLabel" TEXT NOT NULL,
    "submitBtn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademyPageContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademyPageCourse" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademyPageCourse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AcademyPageCourse" ADD CONSTRAINT "AcademyPageCourse_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "AcademyPageContact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
