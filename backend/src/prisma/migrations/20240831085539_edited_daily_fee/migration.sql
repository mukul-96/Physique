/*
  Warnings:

  - Made the column `dailyFee` on table `Branches` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Branches" ALTER COLUMN "dailyFee" SET NOT NULL;
