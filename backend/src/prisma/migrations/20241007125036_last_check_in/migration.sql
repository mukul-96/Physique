/*
  Warnings:

  - You are about to drop the column `created_at` on the `AuthorizedScanners` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `AuthorizedScanners` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `AuthorizedScanners` table. All the data in the column will be lost.
  - Added the required column `branchId` to the `AuthorizedScanners` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AuthorizedScanners_token_key";

-- AlterTable
ALTER TABLE "AuthorizedScanners" DROP COLUMN "created_at",
DROP COLUMN "status",
DROP COLUMN "token",
ADD COLUMN     "branchId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "checkedIn" TIMESTAMP(3),
ADD COLUMN     "dailyFee" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "AuthorizedScanners" ADD CONSTRAINT "AuthorizedScanners_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
