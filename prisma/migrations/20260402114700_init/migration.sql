-- CreateTable
CREATE TABLE "HomePageChooseUsHeadings" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "badge" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "descr" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomePageChooseUsHeadings_pkey" PRIMARY KEY ("id")
);
