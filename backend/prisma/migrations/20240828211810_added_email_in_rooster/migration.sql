/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Rooster` will be added. If there are existing duplicate values, this will fail.
  - Made the column `branchId` on table `Managers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Rooster` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Managers" ALTER COLUMN "branchId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Rooster" ADD COLUMN     "email" TEXT NOT NULL DEFAULT 'default@example.com',
ALTER COLUMN "description" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Rooster_email_key" ON "Rooster"("email");
