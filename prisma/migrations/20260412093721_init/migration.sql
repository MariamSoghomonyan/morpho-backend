-- CreateTable
CREATE TABLE "SmmIntros" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "descr" TEXT NOT NULL,
    "advice_btn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SmmIntros_pkey" PRIMARY KEY ("id")
);
