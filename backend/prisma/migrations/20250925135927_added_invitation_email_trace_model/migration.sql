/*
  Warnings:

  - You are about to drop the `SocialMedia` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('SENT', 'FAILED', 'PENDING');

-- DropForeignKey
ALTER TABLE "SocialMedia" DROP CONSTRAINT "SocialMedia_userId_fkey";

-- DropTable
DROP TABLE "SocialMedia";

-- CreateTable
CREATE TABLE "InvitationEmail" (
    "id" UUID NOT NULL,
    "to" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" "DeliveryStatus" NOT NULL,
    "error" TEXT,
    "isSeen" BOOLEAN NOT NULL DEFAULT false,
    "newsletterTypeId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "InvitationEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InvitationEmail_userId_key" ON "InvitationEmail"("userId");

-- AddForeignKey
ALTER TABLE "InvitationEmail" ADD CONSTRAINT "InvitationEmail_newsletterTypeId_fkey" FOREIGN KEY ("newsletterTypeId") REFERENCES "NewsletterType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvitationEmail" ADD CONSTRAINT "InvitationEmail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
