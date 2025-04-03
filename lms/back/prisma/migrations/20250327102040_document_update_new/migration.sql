/*
  Warnings:

  - You are about to drop the column `userId` on the `library` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "library" DROP CONSTRAINT "library_userId_fkey";

-- AlterTable
ALTER TABLE "library" DROP COLUMN "userId";
