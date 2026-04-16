-- CreateTable
CREATE TABLE "aboutIntros" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "badge" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "descr" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aboutIntros_pkey" PRIMARY KEY ("id")
);
