-- CreateTable
CREATE TABLE "footerSocialLinks" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "footerSocialLinks_pkey" PRIMARY KEY ("id")
);
