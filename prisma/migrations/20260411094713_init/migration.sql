-- CreateTable
CREATE TABLE "designCategories" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "designCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "designCategoryTabs" (
    "id" TEXT NOT NULL,
    "tabId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "designCategoryTabs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "designCategoryItems" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "descr" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "tabId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "designCategoryItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "designCategoryTabs" ADD CONSTRAINT "designCategoryTabs_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "designCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "designCategoryItems" ADD CONSTRAINT "designCategoryItems_tabId_fkey" FOREIGN KEY ("tabId") REFERENCES "designCategoryTabs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
