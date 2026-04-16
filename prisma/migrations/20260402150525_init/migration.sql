-- CreateTable
CREATE TABLE "academyPageIntros" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "badge" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "descr" TEXT NOT NULL,
    "advice_btn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academyPageIntros_pkey" PRIMARY KEY ("id")
);
