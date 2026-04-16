-- CreateTable
CREATE TABLE "academyPageTeams" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academyPageTeams_pkey" PRIMARY KEY ("id")
);
