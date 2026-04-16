/*
  Warnings:

  - You are about to drop the column `badge` on the `iTIntros` table. All the data in the column will be lost.
  - Added the required column `subtitle` to the `iTIntros` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "iTIntros" DROP COLUMN "badge",
ADD COLUMN     "subtitle" TEXT NOT NULL;
