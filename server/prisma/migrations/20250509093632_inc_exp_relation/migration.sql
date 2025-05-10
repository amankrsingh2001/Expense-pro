/*
  Warnings:

  - Added the required column `userId` to the `expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `income` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expense" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "income" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "income" ADD CONSTRAINT "income_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
