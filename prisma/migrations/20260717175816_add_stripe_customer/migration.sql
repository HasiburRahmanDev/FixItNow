/*
  Warnings:

  - You are about to drop the column `stripeCustomerId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `stripeIntentId` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripeCustomerId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Payment_stripeCustomerId_key";

-- DropIndex
DROP INDEX "Payment_stripeIntentId_key";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "stripeCustomerId",
DROP COLUMN "stripeIntentId",
ALTER COLUMN "amount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "stripeCustomerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_stripeCustomerId_key" ON "users"("stripeCustomerId");
