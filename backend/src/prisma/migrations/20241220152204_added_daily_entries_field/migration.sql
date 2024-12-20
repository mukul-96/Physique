/*
  Warnings:

  - You are about to drop the column `brachId` on the `Members` table. All the data in the column will be lost.
  - Added the required column `branchId` to the `Members` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Branches" ADD COLUMN     "dailyEntry" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "dailySales" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Members" DROP COLUMN "brachId",
ADD COLUMN     "branchId" INTEGER NOT NULL;
