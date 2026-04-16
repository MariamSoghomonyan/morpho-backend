-- CreateTable
CREATE TABLE "SmmProcess" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "offer_btn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SmmProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SmmStep" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "smmProcessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SmmStep_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SmmStep" ADD CONSTRAINT "SmmStep_smmProcessId_fkey" FOREIGN KEY ("smmProcessId") REFERENCES "SmmProcess"("id") ON DELETE CASCADE ON UPDATE CASCADE;
