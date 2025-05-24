-- CreateEnum
CREATE TYPE "NewsletterTypeStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Subscriber" ADD COLUMN     "newsletterTypeId" UUID;

-- CreateTable
CREATE TABLE "NewsletterType" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "status" "NewsletterTypeStatus" NOT NULL DEFAULT 'ACTIVE',
    "userId" UUID,

    CONSTRAINT "NewsletterType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subscriber" ADD CONSTRAINT "Subscriber_newsletterTypeId_fkey" FOREIGN KEY ("newsletterTypeId") REFERENCES "NewsletterType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsletterType" ADD CONSTRAINT "NewsletterType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
