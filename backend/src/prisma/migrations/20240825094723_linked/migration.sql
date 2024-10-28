/*
  Warnings:

  - Added the required column `monthlyReportId` to the `Utilities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Utilities" ADD COLUMN     "monthlyReportId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Utilities" ADD CONSTRAINT "Utilities_monthlyReportId_fkey" FOREIGN KEY ("monthlyReportId") REFERENCES "MonthlyReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
