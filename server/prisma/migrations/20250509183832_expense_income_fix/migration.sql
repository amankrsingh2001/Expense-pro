/*
  Warnings:

  - Added the required column `amount` to the `expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `income` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expense" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "income" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL;
