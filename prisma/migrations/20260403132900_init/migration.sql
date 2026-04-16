-- CreateTable
CREATE TABLE "FooterContacts" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "email_label" TEXT NOT NULL,
    "telephone_label" TEXT NOT NULL,
    "address_label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FooterContacts_pkey" PRIMARY KEY ("id")
);
