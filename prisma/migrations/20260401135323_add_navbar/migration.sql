-- CreateTable
CREATE TABLE "Navbar" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "route" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Navbar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NavbarDropdown" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "navbarId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NavbarDropdown_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NavbarDropdown" ADD CONSTRAINT "NavbarDropdown_navbarId_fkey" FOREIGN KEY ("navbarId") REFERENCES "Navbar"("id") ON DELETE CASCADE ON UPDATE CASCADE;
