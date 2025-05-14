-- CreateEnum
CREATE TYPE "SubscriberStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'UNSUBSCRIBED');

-- AlterTable
ALTER TABLE "Subscriber" ADD COLUMN     "status" "SubscriberStatus" NOT NULL DEFAULT 'ACTIVE';
