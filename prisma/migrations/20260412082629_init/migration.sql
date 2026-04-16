-- CreateTable
CREATE TABLE "iTIntros" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "badge" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "iTIntros_pkey" PRIMARY KEY ("id")
);
