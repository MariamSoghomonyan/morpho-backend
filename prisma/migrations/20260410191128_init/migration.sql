-- CreateTable
CREATE TABLE "AboutChoose" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "badge" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutChoose_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutChooseItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "chooseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutChooseItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AboutChooseItem" ADD CONSTRAINT "AboutChooseItem_chooseId_fkey" FOREIGN KEY ("chooseId") REFERENCES "AboutChoose"("id") ON DELETE CASCADE ON UPDATE CASCADE;
