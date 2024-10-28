-- CreateTable
CREATE TABLE "AuthorizedScanners" (
    "id" SERIAL NOT NULL,
    "scanner_name" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthorizedScanners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthorizedScanners_token_key" ON "AuthorizedScanners"("token");
