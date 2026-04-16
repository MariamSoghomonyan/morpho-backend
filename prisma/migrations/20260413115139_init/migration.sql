-- CreateTable
CREATE TABLE "OurService" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "consultation_btn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OurService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OurServiceItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OurServiceItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OurServiceItem" ADD CONSTRAINT "OurServiceItem_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "OurService"("id") ON DELETE CASCADE ON UPDATE CASCADE;
