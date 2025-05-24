/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `NewsletterType` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "NewsletterType" ADD COLUMN     "key" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterType_key_key" ON "NewsletterType"("key");
