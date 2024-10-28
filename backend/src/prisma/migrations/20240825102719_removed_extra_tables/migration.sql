/*
  Warnings:

  - You are about to drop the column `monthlyReportId` on the `Utilities` table. All the data in the column will be lost.
  - You are about to drop the `MonthlyReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `month` to the `Utilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Utilities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MonthlyReport" DROP CONSTRAINT "MonthlyReport_reportId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_branchId_fkey";

-- DropForeignKey
ALTER TABLE "Utilities" DROP CONSTRAINT "Utilities_monthlyReportId_fkey";

-- AlterTable
ALTER TABLE "Utilities" DROP COLUMN "monthlyReportId",
ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- DropTable
DROP TABLE "MonthlyReport";

-- DropTable
DROP TABLE "Report";
