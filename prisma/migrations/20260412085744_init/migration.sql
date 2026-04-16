-- CreateTable
CREATE TABLE "ITProcess" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "offer_btn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ITProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ITProcessStep" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "itProcessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ITProcessStep_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ITProcessStep" ADD CONSTRAINT "ITProcessStep_itProcessId_fkey" FOREIGN KEY ("itProcessId") REFERENCES "ITProcess"("id") ON DELETE CASCADE ON UPDATE CASCADE;
