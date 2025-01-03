-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
