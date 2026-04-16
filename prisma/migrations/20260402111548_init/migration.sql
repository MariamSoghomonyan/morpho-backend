-- CreateTable
CREATE TABLE "HomePageService" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "tabName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "descr" TEXT NOT NULL,
    "buttonText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomePageService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HomePageService_slug_idx" ON "HomePageService"("slug");

-- CreateIndex
CREATE INDEX "HomePageService_lang_idx" ON "HomePageService"("lang");

-- CreateIndex
CREATE UNIQUE INDEX "HomePageService_slug_lang_key" ON "HomePageService"("slug", "lang");
