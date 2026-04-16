-- CreateTable
CREATE TABLE "ConsultingService" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConsultingService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsultingServiceItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConsultingServiceItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ConsultingServiceItem" ADD CONSTRAINT "ConsultingServiceItem_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "ConsultingService"("id") ON DELETE CASCADE ON UPDATE CASCADE;
