/*
  Warnings:

  - You are about to drop the column `age` on the `Gcp` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Gcp` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Gcp` table. All the data in the column will be lost.
  - Added the required column `X` to the `Gcp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Y` to the `Gcp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discription` to the `Gcp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gcp" DROP COLUMN "age",
DROP COLUMN "city",
DROP COLUMN "name",
ADD COLUMN     "X" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Y" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "discription" TEXT NOT NULL;
