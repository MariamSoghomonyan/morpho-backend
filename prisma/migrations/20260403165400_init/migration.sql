-- CreateTable
CREATE TABLE "aboutValues" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "badge" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "about_btn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aboutValues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aboutValueItems" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "aboutId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aboutValueItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "aboutValueItems" ADD CONSTRAINT "aboutValueItems_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "aboutValues"("id") ON DELETE CASCADE ON UPDATE CASCADE;
