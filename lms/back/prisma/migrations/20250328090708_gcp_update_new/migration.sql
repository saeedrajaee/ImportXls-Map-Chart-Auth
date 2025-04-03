/*
  Warnings:

  - You are about to drop the column `discription` on the `Gcp` table. All the data in the column will be lost.
  - Added the required column `description` to the `Gcp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gcp" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT NOT NULL;
