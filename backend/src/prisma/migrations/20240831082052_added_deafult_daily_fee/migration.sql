-- AlterTable
ALTER TABLE "Branches" ALTER COLUMN "dailyFee" SET DEFAULT 59;

-- CreateTable
CREATE TABLE "Members" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "brachId" INTEGER NOT NULL,
    "dateOfPurchase" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("id")
);
