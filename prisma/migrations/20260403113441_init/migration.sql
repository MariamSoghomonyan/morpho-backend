-- CreateTable
CREATE TABLE "footerIntros" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "descr" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "footerIntros_pkey" PRIMARY KEY ("id")
);
