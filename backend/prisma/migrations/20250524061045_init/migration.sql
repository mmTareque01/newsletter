/*
  Warnings:

  - Made the column `key` on table `NewsletterType` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "NewsletterType" ALTER COLUMN "key" SET NOT NULL;
