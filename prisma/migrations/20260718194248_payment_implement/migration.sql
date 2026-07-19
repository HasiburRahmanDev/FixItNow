/*
  Warnings:

  - You are about to drop the column `customerId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Payment` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `provider` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripeSessionId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Made the column `amount` on table `Payment` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `status` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_customerId_fkey";

-- DropIndex
DROP INDEX "Payment_transactionId_key";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "customerId",
DROP COLUMN "transactionId",
DROP COLUMN "updatedAt",
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "provider" TEXT NOT NULL,
ADD COLUMN     "stripeSessionId" TEXT NOT NULL,
ALTER COLUMN "amount" SET NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE INTEGER,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;
